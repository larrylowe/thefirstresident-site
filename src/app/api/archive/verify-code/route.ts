/**
 * POST /api/archive/verify-code  { email, last4, code }
 *
 * Final step of renewed recovery. Re-verifies the purchase, checks the emailed
 * code (single use, 10 minutes, 5 guesses), grants one more PDF and one more
 * EPUB download (plus, once, any initial downloads left unused when the 14
 * days ended), and returns a fresh 15-minute download link.
 */

import { NextRequest, NextResponse } from "next/server";
import { findPurchase, parseRecoveryInput } from "@/lib/purchase";
import { redeemRecoveryCode } from "@/lib/recoveryCodes";
import { clientKey, isRateLimited, recordFailure, RATE_LIMIT_MESSAGE } from "@/lib/rateLimit";
import { accessPayload, archiveCookie, FAILURE_MESSAGE } from "@/lib/recoveryResponse";

const BAD_CODE = "That code is incorrect or has expired. Please request a new code.";

export async function POST(request: NextRequest) {
  const key = clientKey(request.headers);
  if (isRateLimited(key)) return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 });

  let input;
  let code = "";
  try {
    const body = await request.json();
    input = parseRecoveryInput(body);
    code = (body?.code ?? "").toString();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const priceId = process.env.STRIPE_PRICE_ID_EBOOK;
  if (!input || !priceId) return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 400 });

  try {
    const purchase = await findPurchase(input.typedEmail, input.last4, priceId);
    if (!purchase) {
      recordFailure(key);
      return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 403 });
    }

    const result = await redeemRecoveryCode(purchase, code);
    if (result.status === "invalid") {
      recordFailure(key);
      return NextResponse.json({ error: BAD_CODE }, { status: 403 });
    }
    if (result.status === "wait") {
      return NextResponse.json(
        { error: "New downloads can be added once every 30 days.", nextRenewalAt: result.nextRenewalAt },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        message:
          result.status === "granted"
            ? "Verified. Your downloads have been renewed."
            : "Verified. You still have downloads available.",
        ...accessPayload(purchase.sessionId, priceId, result.allowance),
      },
      { status: 200, headers: { "Set-Cookie": archiveCookie() } }
    );
  } catch (err) {
    console.error("Verify code error:", (err as Error).message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a minute." },
      { status: 503 }
    );
  }
}
