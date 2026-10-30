/**
 * GET /buy
 *
 * Permanent purchase link for the website, PDFs, email and social posts.
 * Creates the ebook Checkout Session server-side and redirects to Stripe,
 * so it works when visited directly without loading the homepage first.
 */

import { NextRequest, NextResponse } from "next/server";
import { createEbookCheckoutSession, describeCheckoutError } from "@/lib/checkout";

// A fresh Checkout Session is needed on every visit — never cache this route
export const dynamic = "force-dynamic";

const NO_STORE = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex",
};

export async function GET(request: NextRequest) {
  try {
    const session = await createEbookCheckoutSession(request.nextUrl.origin);
    if (!session.url) throw new Error("Checkout Session has no URL");
    return NextResponse.redirect(session.url, { status: 303, headers: NO_STORE });
  } catch (error) {
    console.error("Buy route checkout error", describeCheckoutError(error));
    // Send the visitor to the offer on the homepage with a visible notice
    const fallback = new URL("/?checkout=unavailable#buy", request.nextUrl.origin);
    return NextResponse.redirect(fallback, { status: 303, headers: NO_STORE });
  }
}
