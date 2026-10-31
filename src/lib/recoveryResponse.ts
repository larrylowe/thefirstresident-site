/**
 * Shared pieces of the recovery endpoints' responses.
 */

import { createArchiveToken, buildArchiveCookieHeader } from "@/lib/archiveAccess";
import { createDownloadToken } from "@/lib/downloadToken";
import type { Allowance } from "@/lib/downloadRecords";

export const FAILURE_MESSAGE =
  "We could not match those details to a completed ebook purchase. " +
  "Please check the email used at checkout and the last 4 digits of the card, " +
  "or contact support@thefirstresident.com with your receipt.";

export const SUCCESS_MESSAGE = "Purchase found. Welcome back to Briar Glen.";

export type Renewal = "not_needed" | "available" | "wait";

/** What the client needs to show downloads: a 15-minute link and counts. No purchase details. */
export function accessPayload(sessionId: string, priceId: string, a: Allowance) {
  return {
    downloadUrl: "/api/download?token=" + encodeURIComponent(createDownloadToken(sessionId, priceId)),
    remaining: a.remaining,
    inWindow: a.inWindow,
    windowEndsAt: a.windowEndsAt,
    renewal: (!a.renewalNeeded ? "not_needed" : a.nextRenewalAt ? "wait" : "available") as Renewal,
    nextRenewalAt: a.nextRenewalAt,
  };
}

/** The Archive cookie, set on every verified match. Archive access never depends on download credits. */
export function archiveCookie(): string {
  return buildArchiveCookieHeader(createArchiveToken());
}
