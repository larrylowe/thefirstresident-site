/**
 * GET /api/download?token=xxx[&format=epub]
 *
 * Step 2 of the two-step secure download flow.
 *
 * Verifies the HMAC token from /api/download-token (or from recovery), fetches
 * the private PDF or EPUB from Vercel Blob, and only then takes one download
 * from that format's allowance (see lib/downloadRecords) before streaming it.
 *
 * Security:
 *  - Token must be valid HMAC-SHA256 signed by DOWNLOAD_TOKEN_SECRET and
 *    unexpired (15 min TTL)
 *  - PriceId in token must match STRIPE_PRICE_ID_EBOOK
 *  - 3 PDF + 3 EPUB downloads in the 14 days after payment, plus any
 *    credits granted by verified recovery
 *  - The file is fetched server-side from private Blob; no Blob URL is ever
 *    returned to the client
 *
 * What counts as a download: the file was retrieved from storage and the
 * response is about to start. Nothing is counted when the token, price,
 * allowance or storage check fails. The server cannot know whether the
 * browser saved the file. The allowance is taken with a compare-and-swap
 * write, so simultaneous requests cannot exceed it.
 */

import { NextRequest } from "next/server";
import { get, list } from "@vercel/blob";
import { verifyDownloadToken } from "@/lib/downloadToken";
import { allowance, consume, getDownloadRecord, updateRecord } from "@/lib/downloadRecords";
import { getPaidAt } from "@/lib/purchase";
import { errorHtml } from "@/lib/errorHtml";

const NONE_LEFT_MESSAGE =
  "There are no downloads left for this format right now. Your purchase is still yours: " +
  "visit thefirstresident.com/success to recover access with your purchase email and the last 4 digits of your card.";

const LEGACY_PDF_PATH = "ebooks/The_First_Resident_of_Briar_Glen_Ebook_Larry_Lowe.pdf";

/** The two formats every verified purchase includes. */
const FORMATS = {
  pdf: {
    filename: "The First Resident of Briar Glen Ebook.pdf",
    contentType: "application/pdf",
    envVar: "BLOB_EBOOK_PATH",
  },
  epub: {
    filename: "The First Resident of Briar Glen Ebook.epub",
    contentType: "application/epub+zip",
    envVar: "BLOB_EBOOK_EPUB_PATH",
  },
} as const;
type Format = keyof typeof FORMATS;

/**
 * Private blob pathnames to try, in order. The standard-named file in
 * ebooks/ wins once it is uploaded; until then the PDF falls back to the
 * configured BLOB_EBOOK_PATH and then to the original ebook pathname.
 * An env value that is not a pathname for this format (BLOB_EBOOK_PATH once
 * held a pasted CLI command) is ignored.
 */
function candidatePaths(format: Format): string[] {
  const { filename, envVar } = FORMATS[format];
  const paths = ["ebooks/" + filename];
  const configured = process.env[envVar]?.trim().replace(/^\/+/, "");
  const ext = format === "pdf" ? /\.pdf$/i : /\.epub$/i;
  if (configured && /^[\w ./-]+$/.test(configured) && ext.test(configured)) {
    paths.push(configured);
  } else if (configured) {
    console.error(envVar + " is not a " + format + " pathname; ignoring it");
  }
  if (format === "pdf") paths.push(LEGACY_PDF_PATH);
  return [...new Set(paths)];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawToken = searchParams.get("token");
  const format: Format = searchParams.get("format") === "epub" ? "epub" : "pdf";

  // --- 1. Token must be present ---
  if (!rawToken) {
    return errorHtml(
      "This download link is invalid or has expired. Please return to your purchase confirmation page."
    );
  }

  // --- 2. Verify HMAC signature and expiry ---
  let sessionId: string;
  let tokenPriceId: string;
  try {
    const payload = verifyDownloadToken(rawToken);
    sessionId = payload.sessionId;
    tokenPriceId = payload.priceId;
  } catch (err) {
    console.warn("Download token verification failed:", err);
    return errorHtml(
      "This download link is invalid or has expired. Please return to your purchase confirmation page."
    );
  }

  // --- 3. Cross-check token priceId against current server config ---
  const configuredPriceId = process.env.STRIPE_PRICE_ID_EBOOK;
  if (!configuredPriceId || tokenPriceId !== configuredPriceId) {
    return errorHtml("This purchase does not include the e-book.");
  }

  // --- 4. Quick allowance check before touching the file (read only) ---
  const paidAt = () => getPaidAt(sessionId);
  try {
    const existing = await getDownloadRecord(sessionId, paidAt);
    if (existing && allowance(existing).remaining[format] <= 0) {
      return errorHtml(NONE_LEFT_MESSAGE, 429);
    }
  } catch (err) {
    console.error("Download record read failed:", err);
    return errorHtml("Downloads are briefly unavailable. Please try again in a minute.", 503);
  }

  // --- 5. Find the first candidate blob with an exact pathname, then fetch it privately.
  let blobResult;
  try {
    let blob;
    for (const path of candidatePaths(format)) {
      const { blobs } = await list({ prefix: path, limit: 10 });
      blob = blobs.find((b) => b.pathname === path);
      if (blob) break;
    }
    if (!blob) {
      console.error("E-book blob not found for format:", format);
      return errorHtml(
        "The file could not be retrieved. Please contact support with your receipt.",
        500
      );
    }
    blobResult = await get(blob.url, { access: "private" });
  } catch (err) {
    console.error("Failed to fetch e-book blob:", err);
    return errorHtml(
      "The file could not be retrieved. Please contact support with your receipt.",
      500
    );
  }

  if (!blobResult || blobResult.statusCode !== 200 || !blobResult.stream) {
    return errorHtml(
      "The file could not be retrieved. Please contact support with your receipt.",
      500
    );
  }

  // --- 6. Take one download of this format atomically; stop if none is left ---
  let taken: boolean;
  try {
    taken = await updateRecord(sessionId, paidAt, (record) => {
      const ok = consume(record, format);
      return { result: ok, write: ok };
    });
  } catch (err) {
    console.error("Download record update failed:", err);
    await blobResult.stream.cancel().catch(() => {});
    return errorHtml("Downloads are briefly unavailable. Please try again in a minute.", 503);
  }
  if (!taken) {
    await blobResult.stream.cancel().catch(() => {});
    return errorHtml(NONE_LEFT_MESSAGE, 429);
  }

  // --- 7. Stream the file to the client ---
  const { filename, contentType } = FORMATS[format];
  return new Response(blobResult.stream, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
