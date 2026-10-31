/**
 * POST /api/archive/send-code  { email, last4 }
 *
 * Step two of recovery when a format has no downloads left. Re-verifies the
 * purchase exactly as restore-access does, then emails a one-time code to the
 * address recorded on the Stripe purchase (never to an address typed here).
 * Limits: one renewal per purchase per 30 days; 3 codes per hour, 60 seconds
 * apart. Unmatched details get the same generic failure as restore-access.
 */

import { NextRequest, NextResponse } from "next/server";
import { findPurchase, parseRecoveryInput } from "@/lib/purchase";
import { sendRecoveryCode } from "@/lib/recoveryCodes";
import { clientKey, isRateLimited, recordFailure, RATE_LIMIT_MESSAGE } from "@/lib/rateLimit";
import { FAILURE_MESSAGE } from "@/lib/recoveryResponse";

const UNAVAILABLE =
  "We could not send a code just now. Please try again later or contact support@thefirstresident.com.";

export async function POST(request: NextRequest) {
  const key = clientKey(request.headers);
  if (isRateLimited(key)) return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 });

  let input;
  try {
    input = parseRecoveryInput(await request.json());
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

    const result = await sendRecoveryCode(purchase);
    switch (result.status) {
      case "sent":
        return NextResponse.json({
          message: "We have sent a 6-digit code to the email address used for this purchase. It expires in 10 minutes.",
        });
      case "wait":
        return NextResponse.json(
          { error: "New downloads can be added once every 30 days.", nextRenewalAt: result.nextRenewalAt },
          { status: 409 }
        );
      case "not_needed":
        return NextResponse.json(
          { error: "You still have downloads available in both formats." },
          { status: 409 }
        );
      case "rate_limited":
        return NextResponse.json(
          { error: "A code was sent recently. Please check your email, or wait a few minutes before asking for another." },
          { status: 429 }
        );
      default:
        return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
    }
  } catch (err) {
    console.error("Send code error:", (err as Error).message);
    return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
  }
}
