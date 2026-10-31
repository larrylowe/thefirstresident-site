/**
 * GET /api/cron/download-reminder
 *
 * Daily Vercel Cron job (see vercel.json). Sends the single day-7 reminder to
 * buyers who have not downloaded either format. A purchase is eligible when:
 *  - it is a paid, unrefunded ebook purchase (lib/purchase.verifySession),
 *  - 7 days have passed since the successful payment and fewer than 14,
 *  - no PDF or EPUB download has been delivered,
 *  - no reminder has been sent before, and
 *  - Stripe has an email for it.
 *
 * Duplicates: each purchase is claimed with an atomic write before sending,
 * and reminderSentAt is recorded after. Resend also gets an idempotency key.
 * A failed send releases the claim so the next daily run retries it.
 *
 * Protected by CRON_SECRET: Vercel sends "Authorization: Bearer <CRON_SECRET>".
 * Without CRON_SECRET set, the endpoint refuses every call.
 */

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { verifySession } from "@/lib/purchase";
import { updateRecord } from "@/lib/downloadRecords";
import { emailConfigured, sendEmail } from "@/lib/email";
import { reminderEmail } from "@/lib/emailTemplates";

export const maxDuration = 60;

const DAY = 24 * 60 * 60 * 1000;
const CLAIM_TTL_MS = 60 * 60 * 1000;

type Decision = "claim" | "downloaded" | "already_sent" | "claimed" | "outside_window";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const priceId = process.env.STRIPE_PRICE_ID_EBOOK;
  if (!priceId) return NextResponse.json({ error: "STRIPE_PRICE_ID_EBOOK not set" }, { status: 500 });
  if (!emailConfigured()) {
    console.log("download-reminder: email not configured; nothing sent");
    return NextResponse.json({ sent: 0, skipped: "email_not_configured" });
  }

  const now = Date.now();
  // Sessions are created a little before payment, so look back one extra day.
  const sessions: Stripe.Checkout.Session[] = [];
  let startingAfter: string | undefined;
  for (let page = 0; page < 10; page++) {
    const batch = await stripe.checkout.sessions.list({
      status: "complete",
      created: { gte: Math.floor((now - 15 * DAY) / 1000), lte: Math.floor((now - 7 * DAY) / 1000) },
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });
    sessions.push(...batch.data);
    if (!batch.has_more || batch.data.length === 0) break;
    startingAfter = batch.data[batch.data.length - 1].id;
  }

  const counts = { checked: 0, sent: 0, failed: 0, ineligible: 0 };
  for (const session of sessions) {
    if (session.mode !== "payment" || session.payment_status !== "paid") continue;
    counts.checked++;
    try {
      const purchase = await verifySession(session, priceId);
      if (!purchase || !purchase.email) {
        counts.ineligible++;
        continue;
      }
      const decision = await updateRecord<Decision>(
        purchase.sessionId,
        async () => purchase.paidAt,
        (record, t) => {
          const paid = Date.parse(record.paidAt);
          if (t < paid + 7 * DAY || t >= Date.parse(record.windowEndsAt)) {
            return { result: "outside_window", write: false };
          }
          if (record.reminderSentAt) return { result: "already_sent", write: false };
          if (record.delivered.pdf + record.delivered.epub > 0 || record.used.pdf + record.used.epub > 0) {
            return { result: "downloaded", write: false };
          }
          if (record.reminderClaimAt && t - Date.parse(record.reminderClaimAt) < CLAIM_TTL_MS) {
            return { result: "claimed", write: false };
          }
          record.reminderClaimAt = new Date(t).toISOString();
          return { result: "claim", write: true };
        }
      );
      if (decision !== "claim") {
        counts.ineligible++;
        continue;
      }

      const result = await sendEmail(reminderEmail(purchase.email, purchase.sessionId));
      await updateRecord(purchase.sessionId, async () => purchase.paidAt, (record, t) => {
        if (result.ok) record.reminderSentAt = new Date(t).toISOString();
        record.reminderClaimAt = null;
        return { result: null, write: true };
      });
      if (result.ok) counts.sent++;
      else counts.failed++;
    } catch (err) {
      counts.failed++;
      console.error("download-reminder: error for one purchase:", (err as Error).message);
    }
  }

  console.log("download-reminder:", JSON.stringify(counts));
  return NextResponse.json(counts);
}
