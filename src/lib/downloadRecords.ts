/**
 * Per-purchase download records, stored as private JSON blobs in the existing
 * Vercel Blob store at:
 *   download-records/<checkout session id>.json
 *
 * Policy (three separate things, kept separate here):
 *  - Entitlement: permanent. Nothing in this file ever ends it.
 *  - Initial download period: 14 days from the successful Stripe payment, with
 *    3 successful downloads of the PDF and 3 of the EPUB, counted separately.
 *  - Download links: signed and short-lived (see lib/downloadToken).
 *
 * After recovery verified by an emailed code, a purchase gets 1 more PDF and
 * 1 more EPUB download ("extra" credits), at most once every 30 days. The
 * first recovery after the 14 days also carries over any initial downloads
 * that were never used. Counters are never reset.
 *
 * Concurrency: every change is a compare-and-swap. The record is read with its
 * ETag and written back with ifMatch (or allowOverwrite: false when it is new);
 * if another request changed it in between, the write fails and is retried on
 * fresh data, so simultaneous downloads cannot exceed the allowance.
 *
 * Records written before this version ({ firstDownloadAt, expiresAt,
 * downloadCount }, PDF only, 72 hours) are migrated on first touch: their PDF
 * count is kept, the EPUB starts at zero, and the window becomes 14 days from
 * the original payment. The original fields are kept under `legacy`.
 */

import { get, put, BlobNotFoundError, BlobPreconditionFailedError, BlobError } from "@vercel/blob";

export const MAX_DOWNLOADS = 3;
export const INITIAL_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;
export const RECOVERY_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000;
export const FORMATS = ["pdf", "epub"] as const;
export type Format = (typeof FORMATS)[number];
type PerFormat = Record<Format, number>;

interface LegacyRecord {
  firstDownloadAt: string;
  expiresAt: string;
  downloadCount: number;
}

export interface PendingCode {
  /** HMAC-SHA256 of the code; the code itself is never stored. */
  hash: string;
  expiresAt: string;
  attempts: number;
  /** Send times in the last hour, for rate limiting. */
  sentAt: string[];
}

export interface DownloadRecord {
  version: 2;
  paidAt: string;
  windowEndsAt: string;
  /** Initial downloads used, per format (0..3). */
  used: PerFormat;
  /** Unused credits granted by recovery, per format. */
  extra: PerFormat;
  /** Successful deliveries ever, per format. */
  delivered: PerFormat;
  carriedOver: boolean;
  lastRecoveryAt: string | null;
  reminderSentAt: string | null;
  reminderClaimAt: string | null;
  code: PendingCode | null;
  legacy?: LegacyRecord;
}

export interface Allowance {
  inWindow: boolean;
  windowEndsAt: string;
  remaining: PerFormat;
  /** True when a format has nothing left, so a renewal would help. */
  renewalNeeded: boolean;
  /** When the next renewal may be granted (null = now). */
  nextRenewalAt: string | null;
}

export function recordPath(sessionId: string): string {
  // Stripe session ids are alphanumeric + underscores; the replace guards
  // against path traversal.
  return "download-records/" + sessionId.replace(/[^a-zA-Z0-9_-]/g, "_") + ".json";
}

function zero(): PerFormat {
  return { pdf: 0, epub: 0 };
}

export function newRecord(paidAt: number): DownloadRecord {
  return {
    version: 2,
    paidAt: new Date(paidAt).toISOString(),
    windowEndsAt: new Date(paidAt + INITIAL_WINDOW_MS).toISOString(),
    used: zero(),
    extra: zero(),
    delivered: zero(),
    carriedOver: false,
    lastRecoveryAt: null,
    reminderSentAt: null,
    reminderClaimAt: null,
    code: null,
  };
}

function migrate(legacy: LegacyRecord, paidAt: number): DownloadRecord {
  const record = newRecord(paidAt);
  const count = Math.max(0, Math.floor(Number(legacy.downloadCount) || 0));
  record.used.pdf = Math.min(MAX_DOWNLOADS, count);
  record.delivered.pdf = count;
  record.legacy = legacy;
  return record;
}

function isV2(raw: unknown): raw is DownloadRecord {
  return !!raw && (raw as DownloadRecord).version === 2;
}

export function allowance(record: DownloadRecord, now = Date.now()): Allowance {
  const inWindow = now < Date.parse(record.windowEndsAt);
  const remaining = zero();
  for (const f of FORMATS) {
    const initial = inWindow ? Math.max(0, MAX_DOWNLOADS - record.used[f]) : 0;
    remaining[f] = initial + record.extra[f];
  }
  const nextAt = record.lastRecoveryAt
    ? Date.parse(record.lastRecoveryAt) + RECOVERY_INTERVAL_MS
    : 0;
  return {
    inWindow,
    windowEndsAt: record.windowEndsAt,
    remaining,
    renewalNeeded: remaining.pdf === 0 || remaining.epub === 0,
    nextRenewalAt: nextAt > now ? new Date(nextAt).toISOString() : null,
  };
}

/** Takes one download of `format`; returns false (unchanged) when none is left. */
export function consume(record: DownloadRecord, format: Format, now = Date.now()): boolean {
  const inWindow = now < Date.parse(record.windowEndsAt);
  if (inWindow && record.used[format] < MAX_DOWNLOADS) {
    record.used[format] += 1;
  } else if (record.extra[format] > 0) {
    record.extra[format] -= 1;
  } else {
    return false;
  }
  record.delivered[format] += 1;
  return true;
}

/**
 * Grants one renewal: +1 per format, plus (once, after the 14 days) any initial
 * downloads never used. Returns false (unchanged) inside the 30-day interval
 * or when no format needs it.
 */
export function grantRenewal(record: DownloadRecord, now = Date.now()): boolean {
  const a = allowance(record, now);
  if (!a.renewalNeeded || a.nextRenewalAt) return false;
  for (const f of FORMATS) {
    record.extra[f] += 1;
    if (!a.inWindow && !record.carriedOver) {
      record.extra[f] += Math.max(0, MAX_DOWNLOADS - record.used[f]);
    }
  }
  if (!a.inWindow) record.carriedOver = true;
  record.lastRecoveryAt = new Date(now).toISOString();
  return true;
}

/** Reads a record and its ETag. Missing → nulls. Storage errors throw. */
async function read(sessionId: string): Promise<{ raw: unknown; etag: string | null }> {
  try {
    const res = await get(recordPath(sessionId), { access: "private", useCache: false });
    if (!res || res.statusCode !== 200 || !res.stream) return { raw: null, etag: null };
    const text = await new Response(res.stream).text();
    return { raw: JSON.parse(text), etag: res.blob.etag };
  } catch (err) {
    if (err instanceof BlobNotFoundError) return { raw: null, etag: null };
    throw err;
  }
}

/** Current record (migrated in memory if old), or null when none exists yet. Read-only. */
export async function getDownloadRecord(
  sessionId: string,
  paidAt: () => Promise<number>
): Promise<DownloadRecord | null> {
  const { raw } = await read(sessionId);
  if (!raw) return null;
  return isV2(raw) ? raw : migrate(raw as LegacyRecord, await paidAt());
}

const MAX_ATTEMPTS = 6;

/**
 * Applies `change` to the purchase's record atomically. `change` mutates the
 * record and returns a result; return `{ result, write: false }` to skip the
 * write. A missing record is created from the payment time, and an old record
 * is migrated, before `change` runs. `paidAt` is only called when needed.
 */
export async function updateRecord<T>(
  sessionId: string,
  paidAt: () => Promise<number>,
  change: (record: DownloadRecord, now: number) => { result: T; write: boolean }
): Promise<T> {
  let paid: number | undefined;
  const getPaid = async () => (paid ??= await paidAt());

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const { raw, etag } = await read(sessionId);
    let record: DownloadRecord;
    let structural = false;
    if (!raw) {
      record = newRecord(await getPaid());
      structural = true;
    } else if (!isV2(raw)) {
      record = migrate(raw as LegacyRecord, await getPaid());
      structural = true;
    } else {
      record = raw;
    }

    const { result, write } = change(record, Date.now());
    if (!write && !structural) return result;

    try {
      await put(recordPath(sessionId), JSON.stringify(record), {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        cacheControlMaxAge: 60,
        ...(etag ? { ifMatch: etag } : { allowOverwrite: false }),
      });
      return result;
    } catch (err) {
      const conflict =
        err instanceof BlobPreconditionFailedError ||
        // Creating a record that another request created first.
        (!etag && err instanceof BlobError);
      if (!conflict) throw err;
      await new Promise((r) => setTimeout(r, 40 + Math.random() * 120 * (attempt + 1)));
    }
  }
  throw new Error("Download record busy; please try again");
}
