/**
 * POST /api/archive/restore-access
 *
 * Restore Archive access for returning customers who purchased before the
 * Archive gate was built.  Searches Stripe Checkout Sessions by customer
 * email and verifies a paid ebook purchase.
 *
 * LIMITATION: Stripe's Checkout Session list API does not support filtering
 * directly by customer email.  This route searches PaymentIntents by receipt
 * email and cross-references with confirmed Checkout Sessions.  It covers
 * purchases made with Stripe Checkout going back as far as Stripe retains
 * PaymentIntents (typically all time for live-mode).  It may miss purchases
 * made via Stripe APIs other than Checkout, or if the customer used a
 * different email at checkout than they provide here.
 */

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  createArchiveToken,
  buildArchiveCookieHeader,
  ARCHIVE_COOKIE_NAME,
} from "@/lib/archiveAccess";

const FAILURE_MESSAGE =
  "We could not verify an ebook purchase for that email. " +
  "Please check the email used at checkout or purchase access below.";

const SUCCESS_MESSAGE = "Access restored. Welcome back to Briar Glen.";

export async function POST(request: NextRequest) {
  let email: string;

  try {
    const body = await request.json();
    email = (body.email ?? "").toString().trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  try {
    const expectedPriceId = process.env.STRIPE_PRICE_ID_EBOOK;

    // Search PaymentIntents by receipt email.
    // Stripe supports `receipt_email` as a search query.
    const searchResult = await stripe.paymentIntents.search({
      query: `receipt_email:"${email}" AND status:"succeeded"`,
      limit: 20,
    });

    let verified = false;

    for (const pi of searchResult.data) {
      if (pi.status !== "succeeded") continue;

      // If we have a price ID to check, retrieve the checkout session for this PI
      if (expectedPriceId) {
        // Find Checkout Sessions for this PaymentIntent
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: pi.id,
          limit: 5,
          expand: ["data.line_items"],
        });

        for (const session of sessions.data) {
          if (session.payment_status !== "paid") continue;
          const hasPriceMatch = session.line_items?.data?.some(
            (item) => item.price?.id === expectedPriceId
          );
          if (hasPriceMatch) {
            verified = true;
            break;
          }
        }
      } else {
        // No price ID configured — a paid PaymentIntent for this email is sufficient
        verified = true;
      }

      if (verified) break;
    }

    // Fallback: if PaymentIntent search yielded nothing, try listing recent
    // Checkout Sessions by customer email directly (works for newer Stripe SDK)
    if (!verified) {
      const sessionSearch = await stripe.checkout.sessions.list({
        limit: 100,
        expand: ["data.line_items"],
      });

      for (const session of sessionSearch.data) {
        if (session.payment_status !== "paid") continue;
        const sessionEmail = (
          session.customer_details?.email ?? ""
        ).toLowerCase();
        if (sessionEmail !== email) continue;

        if (expectedPriceId) {
          const hasPriceMatch = session.line_items?.data?.some(
            (item) => item.price?.id === expectedPriceId
          );
          if (hasPriceMatch) {
            verified = true;
            break;
          }
        } else {
          verified = true;
          break;
        }
      }
    }

    if (!verified) {
      return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 403 });
    }

    // Verified — set cookie and return success
    const token = createArchiveToken();
    const cookieHeader = buildArchiveCookieHeader(token);

    return NextResponse.json(
      { message: SUCCESS_MESSAGE },
      {
        status: 200,
        headers: { "Set-Cookie": cookieHeader },
      }
    );
  } catch (err) {
    console.error("Archive restore-access error:", err);
    // Do not reveal internal details
    return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 403 });
  }
}
