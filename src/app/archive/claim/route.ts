/**
 * GET /archive/claim?session_id=<stripe_session_id>
 *
 * Called after a successful Stripe Checkout.  Verifies the session server-side,
 * sets the signed archive access cookie, and redirects to /archive.
 */

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  createArchiveToken,
  buildArchiveCookieHeader,
} from "@/lib/archiveAccess";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(`${BASE_URL}/archive?access=failed`);
  }

  try {
    // Retrieve the Checkout Session from Stripe — never trust the client
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    // Must be paid
    if (session.payment_status !== "paid") {
      return NextResponse.redirect(`${BASE_URL}/archive?access=failed`);
    }

    // Optionally verify against the configured ebook price ID
    const expectedPriceId = process.env.STRIPE_PRICE_ID_EBOOK;
    if (expectedPriceId && session.line_items?.data?.length) {
      const hasPriceMatch = session.line_items.data.some(
        (item) => item.price?.id === expectedPriceId
      );
      if (!hasPriceMatch) {
        return NextResponse.redirect(`${BASE_URL}/archive?access=failed`);
      }
    }

    // All checks passed — issue the archive access cookie
    const token = createArchiveToken();
    const cookieHeader = buildArchiveCookieHeader(token);

    return NextResponse.redirect(`${BASE_URL}/archive?access=granted`, {
      headers: { "Set-Cookie": cookieHeader },
    });
  } catch (err) {
    console.error("Archive claim error:", err);
    return NextResponse.redirect(`${BASE_URL}/archive?access=failed`);
  }
}
