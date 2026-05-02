/**
 * GET /api/download-token?session_id=cs_xxx
 *
 * Step 1 of the two-step secure download flow.
 *
 * Validates the Stripe Checkout Session, then mints a short-lived (10 min)
 * HMAC-signed token and redirects to /api/download?token=... so the user's
 * browser initiates the file download.
 *
 * All Stripe verification happens server-side; no secrets reach the client.
 */

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createDownloadToken } from "@/lib/downloadToken";
import { errorHtml } from "@/lib/errorHtml";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  // --- 1. Require session_id ---
  if (!sessionId) {
    return errorHtml(
      "We could not find your purchase session. Please return to the website or contact support with your receipt."
    );
  }

  // --- 2. Require server configuration ---
  const priceId = process.env.STRIPE_PRICE_ID_EBOOK;
  if (!priceId) {
    console.error("STRIPE_PRICE_ID_EBOOK is not configured");
    return errorHtml(
      "Server configuration error. Please contact support.",
      500
    );
  }

  // --- 3. Retrieve Stripe session (with line items expanded) ---
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
  } catch (err) {
    console.error("Failed to retrieve Stripe session:", err);
    return errorHtml(
      "We could not find your purchase session. Please return to the website or contact support with your receipt."
    );
  }

  // --- 4. Confirm payment completed ---
  if (session.payment_status !== "paid") {
    return errorHtml(
      "This download is only available after payment is completed."
    );
  }

  // --- 5. Confirm the session includes the ebook price ---
  const lineItems = session.line_items?.data ?? [];
  const hasEbook = lineItems.some((item) => item.price?.id === priceId);

  if (!hasEbook) {
    return errorHtml("This purchase does not include the e-book.");
  }

  // --- 6. Mint a 10-minute signed token and redirect to /api/download ---
  const token = createDownloadToken(sessionId, priceId);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return NextResponse.redirect(
    `${siteUrl}/api/download?token=${encodeURIComponent(token)}`
  );
}
