/**
 * One-time email codes that unlock a renewal of download credits.
 *
 *  - 6 digits from crypto.randomInt; only an HMAC of the code is stored, in
 *    the purchase's download record, so it shares the record's atomic writes.
 *  - Expires after 10 minutes, single use, at most 5 wrong guesses.
 *  - At most 3 codes per purchase per hour, and 60 seconds between codes.
 *  - Sent only to the email recorded on the Stripe purchase.
 */

import crypto from "crypto";
import { allowance, grantRenewal, updateRecord, type Allowance } from "@/lib/downloadRecords";
import { sendEmail } from "@/lib/email";
import { codeEmail } from "@/lib/emailTemplates";
import type { VerifiedPurchase } from "@/lib/purchase";

const CODE_TTL_MS = 10 * 60 * 1000;
const MAX_GUESSES = 5;
const MAX_SENDS_PER_HOUR = 3;
const MIN_GAP_MS = 60 * 1000;

function hashCode(sessionId: string, code: string): string {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) throw new Error("DOWNLOAD_TOKEN_SECRET is not set");
  return crypto.createHmac("sha256", secret).update("recovery:" + sessionId + ":" + code).digest("hex");
}

export type SendCodeResult =
  | { status: "sent" }
  | { status: "not_needed" }
  | { status: "wait"; nextRenewalAt: string }
  | { status: "rate_limited" }
  | { status: "no_email" }
  | { status: "email_unavailable" };

export async function sendRecoveryCode(purchase: VerifiedPurchase): Promise<SendCodeResult> {
  if (!purchase.email) return { status: "no_email" };
  const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
  const hash = hashCode(purchase.sessionId, code);

  const stored = await updateRecord<SendCodeResult | null>(
    purchase.sessionId,
    async () => purchase.paidAt,
    (record, now) => {
      const a = allowance(record, now);
      if (!a.renewalNeeded) return { result: { status: "not_needed" }, write: false };
      if (a.nextRenewalAt) return { result: { status: "wait", nextRenewalAt: a.nextRenewalAt }, write: false };
      const recent = (record.code?.sentAt ?? []).filter((t) => now - Date.parse(t) < 60 * 60 * 1000);
      const last = recent.length ? Date.parse(recent[recent.length - 1]) : 0;
      if (recent.length >= MAX_SENDS_PER_HOUR || now - last < MIN_GAP_MS) {
        return { result: { status: "rate_limited" }, write: false };
      }
      record.code = {
        hash,
        expiresAt: new Date(now + CODE_TTL_MS).toISOString(),
        attempts: 0,
        sentAt: [...recent, new Date(now).toISOString()],
      };
      return { result: null, write: true };
    }
  );
  if (stored) return stored;

  const sent = await sendEmail(codeEmail(purchase.email, code));
  return sent.ok ? { status: "sent" } : { status: "email_unavailable" };
}

export type VerifyCodeResult =
  | { status: "granted"; allowance: Allowance }
  | { status: "invalid" }
  | { status: "wait"; nextRenewalAt: string }
  | { status: "not_needed"; allowance: Allowance };

export async function redeemRecoveryCode(
  purchase: VerifiedPurchase,
  code: string
): Promise<VerifyCodeResult> {
  const clean = code.replace(/\D/g, "");
  return updateRecord<VerifyCodeResult>(
    purchase.sessionId,
    async () => purchase.paidAt,
    (record, now) => {
      const pending = record.code;
      if (!pending || clean.length !== 6) return { result: { status: "invalid" }, write: false };
      if (now > Date.parse(pending.expiresAt) || pending.attempts >= MAX_GUESSES) {
        record.code = { ...pending, hash: "", attempts: MAX_GUESSES };
        return { result: { status: "invalid" }, write: true };
      }
      const expected = Buffer.from(pending.hash, "hex");
      const given = Buffer.from(hashCode(purchase.sessionId, clean), "hex");
      if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) {
        record.code = { ...pending, attempts: pending.attempts + 1 };
        return { result: { status: "invalid" }, write: true };
      }
      // Correct: burn the code (keep send times for the hourly limit), then grant.
      record.code = { ...pending, hash: "", attempts: MAX_GUESSES };
      if (grantRenewal(record, now)) {
        return { result: { status: "granted", allowance: allowance(record, now) }, write: true };
      }
      const a = allowance(record, now);
      return {
        result: a.nextRenewalAt
          ? { status: "wait", nextRenewalAt: a.nextRenewalAt }
          : { status: "not_needed", allowance: a },
        write: true,
      };
    }
  );
}
