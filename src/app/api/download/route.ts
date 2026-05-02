/**
 * GET /api/download?token=xxx
 *
 * Step 2 of the two-step secure download flow.
 *
 * Verifies the HMAC token from /api/download-token, checks the download
 * record in Vercel Blob (window + count), then streams the private PDF from
 * Vercel Blob with the correct download headers.
 *
 * Security:
 *  - Token must be valid HMAC-SHA256 signed by DOWNLOAD_TOKEN_SECRET
 *  - Token must not be expired (10 min TTL)
 *  - PriceId in token must match STRIPE_PRICE_ID_EBOOK
 *  - Download must be within the 72-hour window
 *  - Download count must be < MAX_DOWNLOADS (3)
 *  - PDF is fetched server-side via @vercel/blob (private access)
 *  - No public PDF URL is ever returned to the client
 *
 * Note: downloadCount is incremented immediately before streaming begins.
 * This means a failed stream (network drop) still consumes one of the 3
 * allowed downloads. This is acceptable per launch requirements.
 */

import { NextRequest } from "next/server";
import { get, list } from "@vercel/blob";
import { verifyDownloadToken } from "@/lib/downloadToken";
import {
  getDownloadRecord,
  createDownloadRecord,
  incrementDownloadCount,
  MAX_DOWNLOADS,
} from "@/lib/downloadRecords";
import { errorHtml } from "@/lib/errorHtml";

const EBOOK_FILENAME = "The_First_Resident_of_Briar_Glen_Ebook_Larry_Lowe.pdf";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawToken = searchParams.get("token");

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

  // --- 4. Require blob path configuration ---
  const blobPath = process.env.BLOB_EBOOK_PATH;
  if (!blobPath) {
    console.error("BLOB_EBOOK_PATH is not configured");
    return errorHtml("Server configuration error. Please contact support.", 500);
  }

  // --- 5. Get or create Blob download record ---
  let record = await getDownloadRecord(sessionId);
  if (!record) {
    record = await createDownloadRecord(sessionId);
  }

  // --- 6. Check 72-hour download window ---
  if (Date.now() > new Date(record.expiresAt).getTime()) {
    return errorHtml(
      "This secure download window has expired. Please contact us with your receipt and we will help you access your copy.",
      410
    );
  }

  // --- 7. Check 3-download limit ---
  if (record.downloadCount >= MAX_DOWNLOADS) {
    return errorHtml(
      "This purchase has reached its download limit. Please contact us with your receipt if you need help accessing your copy.",
      429
    );
  }

  // --- 8. Resolve the blob URL by pathname, then fetch the private blob.
  //        @vercel/blob get() requires a full URL, not a pathname.
  let blobResult;
  try {
    const { blobs } = await list({ prefix: blobPath, limit: 1 });
    if (blobs.length === 0) {
      console.error("E-book blob not found at path:", blobPath);
      return errorHtml(
        "The file could not be retrieved. Please contact support with your receipt.",
        500
      );
    }
    blobResult = await get(blobs[0].url, { access: "private" });
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

  // --- 9. Increment count before streaming (see note at top of file) ---
  await incrementDownloadCount(sessionId, record);

  // --- 10. Stream the PDF to the client ---
  return new Response(blobResult.stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${EBOOK_FILENAME}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
