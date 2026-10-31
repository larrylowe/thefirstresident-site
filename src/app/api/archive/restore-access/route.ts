/**
 * POST /api/archive/restore-access  { email, last4 }
 *
 * Recovers a paid ebook purchase for a returning customer. The buyer proves
 * ownership with the email used at checkout plus the last 4 digits of the card
 * that paid. Both are checked against the same paid, unrefunded Checkout
 * Session for the ebook price, looked up live in Stripe, so purchases made
 * before this route existed are covered (see lib/purchase).
 *
 * On success it sets the Archive cookie and returns a short-lived signed
 * download link with the downloads left per format, and whether renewed
 * credits are available (which needs an emailed code: /api/archive/send-code).
 * Every failure returns the same generic message, so the response never
 * reveals whether an email has bought the book. Repeated failures from one IP
 * are rate-limited.
 */

import { NextRequest, NextResponse } from "next/server";
import { findPurchase, parseRecoveryInput } from "@/lib/purchase";
import { allowance, getDownloadRecord, newRecord } from "@/lib/downloadRecords";
import { clientKey, isRateLimited, recordFailure, RATE_LIMIT_MESSAGE } from "@/lib/rateLimit";
import { accessPayload, archiveCookie, FAILURE_MESSAGE, SUCCESS_MESSAGE } from "@/lib/recoveryResponse";

export async function POST(request: NextRequest) {
  const key = clientKey(request.headers);
  if (isRateLimited(key)) {
    return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 });
  }

  let input;
  try {
    input = parseRecoveryInput(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!input) {
    return NextResponse.json(
      { error: "Enter the email used at checkout and the last 4 digits of the card." },
      { status: 400 }
    );
  }

  const priceId = process.env.STRIPE_PRICE_ID_EBOOK;
  if (!priceId) {
    console.error("STRIPE_PRICE_ID_EBOOK is not configured");
    return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 500 });
  }

  let purchase;
  try {
    purchase = await findPurchase(input.typedEmail, input.last4, priceId);
  } catch (err) {
    // Log the Stripe error type only; never the request body.
    const e = err as { type?: string; message?: string };
    console.error("Purchase recovery error:", e.type, e.message);
    return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 403 });
  }

  if (!purchase) {
    recordFailure(key);
    return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 403 });
  }

  const headers = { "Set-Cookie": archiveCookie() };
  try {
    const record =
      (await getDownloadRecord(purchase.sessionId, async () => purchase.paidAt)) ??
      newRecord(purchase.paidAt);
    return NextResponse.json(
      { message: SUCCESS_MESSAGE, ...accessPayload(purchase.sessionId, priceId, allowance(record)) },
      { status: 200, headers }
    );
  } catch (err) {
    // Storage hiccup: the purchase is verified, so still restore the Archive.
    console.error("Download record read failed during recovery:", (err as Error).message);
    return NextResponse.json(
      { message: SUCCESS_MESSAGE, error: "Downloads are briefly unavailable. Please try again in a minute." },
      { status: 200, headers }
    );
  }
}
