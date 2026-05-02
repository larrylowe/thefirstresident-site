/**
 * Vercel Blob-backed helpers for tracking per-session download records.
 *
 * Each record is stored as a private JSON blob at:
 *   download-records/<sessionId>.json
 *
 * Record shape:
 *   { firstDownloadAt, expiresAt, downloadCount }
 *
 * The 72-hour download window begins at the time of the first valid download
 * (i.e. when createDownloadRecord is first called), not at purchase time.
 *
 * Required env var (same one used for the e-book blob):
 *   BLOB_READ_WRITE_TOKEN
 *
 * No additional storage service is required.
 */

import { get, put, list } from "@vercel/blob";

const DOWNLOAD_WINDOW_HOURS = 72;
export const MAX_DOWNLOADS = 3;

export interface DownloadRecord {
  firstDownloadAt: string; // ISO string
  expiresAt: string;       // ISO string
  downloadCount: number;
}

function recordPath(sessionId: string): string {
  // Sanitise the session ID so it can never escape the prefix directory.
  // Stripe session IDs are alphanumeric + underscores; the replace is a
  // belt-and-suspenders guard against path traversal.
  const safe = sessionId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return "download-records/" + safe + ".json";
}

/**
 * Look up the blob URL for a given pathname via list(), then fetch its content.
 * @vercel/blob get() requires a full blob URL, not a pathname.
 */
async function readBlobText(pathname: string): Promise<string | null> {
  const { blobs } = await list({ prefix: pathname, limit: 1 });
  if (blobs.length === 0) return null;
  const result = await get(blobs[0].url, { access: "private" });
  if (!result || result.statusCode !== 200) return null;
  return new Response(result.stream).text();
}

export async function getDownloadRecord(
  sessionId: string
): Promise<DownloadRecord | null> {
  try {
    const raw = await readBlobText(recordPath(sessionId));
    if (!raw) return null;
    return JSON.parse(raw) as DownloadRecord;
  } catch {
    // Blob not found or parse error -- treat as no record yet
    return null;
  }
}

export async function createDownloadRecord(
  sessionId: string
): Promise<DownloadRecord> {
  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + DOWNLOAD_WINDOW_HOURS * 60 * 60 * 1000
  );

  const record: DownloadRecord = {
    firstDownloadAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    downloadCount: 0,
  };

  await put(recordPath(sessionId), JSON.stringify(record), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });

  return record;
}

export async function incrementDownloadCount(
  sessionId: string,
  record: DownloadRecord
): Promise<void> {
  const updated: DownloadRecord = {
    ...record,
    downloadCount: record.downloadCount + 1,
  };

  await put(recordPath(sessionId), JSON.stringify(updated), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });
}
