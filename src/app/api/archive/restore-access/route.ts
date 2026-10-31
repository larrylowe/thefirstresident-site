/**
 * POST /api/archive/restore-access  { email, last4 }
 *
 * Recovers a paid ebook purchase for a returning customer. The buyer proves
 * ownership with the email used at checkout plus the last 4 digits of the card
 * that paid. Both are checked against the same paid, unrefunded Checkout
 * Session for the ebook price, looked up live in Stripe, so purchases made
 * before this route existed are covered.
 *
 * On success it sets the Archive cookie and returns a short-lived signed
 * download link (see lib/downloadToken). Every failure returns the same
 * generic message, so the response never reveals whether an email has bought
 * the book. Repeated failures from one IP are rate-limited.
 */

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createArchiveToken, buildArchiveCookieHeader } from "@/lib/archiveAccess";
import { createDownloadToken } from "@/lib/downloadToken";

const FAILURE_MESSAGE =
  "We could not match those details to a completed ebook purchase. " +
  "Please check the email used at checkout and the last 4 digits of the card, " +
  "or contact support@thefirstresident.com with your receipt.";

const RATE_LIMIT_MESSAGE =
  "Too many attempts. Please wait 15 minutes and try again, or contact support@thefirstresident.com.";

const SUCCESS_MESSAGE = "Purchase found. Welcome back to Briar Glen.";

// Failed attempts per client IP. In-memory, so it is per server instance:
// it slows guessing rather than guaranteeing a global limit.
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const entry = failures.get(key);
  if (!entry) return false;
  if (Date.now() > entry.resetAt) {
    failures.delete(key);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(key: string) {
  const entry = failures.get(key);
  if (!entry || Date.now() > entry.resetAt) {
    failures.set(key, { count: 1, resetAt: Date.now() + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

/** Paid ebook Checkout Sessions whose checkout email matches, newest first. */
async function findCandidateSessions(email: string): Promise<Stripe.Checkout.Session[]> {
  const found = new Map<string, Stripe.Checkout.Session>();

  // Stripe filters by the email exactly as the buyer typed it at checkout.
  const result = await stripe.checkout.sessions.list({
    customer_details: { email },
    status: "complete",
    limit: 20,
  });
  for (const session of result.data) found.set(session.id, session);

  // If the buyer typed different capitalisation at checkout, the exact filter
  // misses; fall back to a bounded scan of recent completed sessions.
  if (found.size === 0) {
    let startingAfter: string | undefined;
    for (let page = 0; page < 5; page++) {
      const batch = await stripe.checkout.sessions.list({
        status: "complete",
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      for (const session of batch.data) {
        if ((session.customer_details?.email ?? "").toLowerCase() === email) {
          found.set(session.id, session);
        }
      }
      if (!batch.has_more || batch.data.length === 0) break;
      startingAfter = batch.data[batch.data.length - 1].id;
    }
  }

  return [...found.values()].filter(
    (s) => s.mode === "payment" && s.payment_status === "paid"
  );
}

/** True when the session bought the ebook and its charge was paid by a card ending in last4 and not refunded. */
async function sessionMatches(
  session: Stripe.Checkout.Session,
  priceId: string,
  last4: string
): Promise<boolean> {
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
  if (!lineItems.data.some((item) => item.price?.id === priceId)) return false;

  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
  if (!paymentIntentId) return false;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ["latest_charge"],
  });
  if (paymentIntent.status !== "succeeded") return false;

  const charge = paymentIntent.latest_charge;
  if (!charge || typeof charge === "string") return false;
  if (!charge.paid || charge.refunded || charge.amount_refunded > 0) return false;

  return charge.payment_method_details?.card?.last4 === last4;
}

export async function POST(request: NextRequest) {
  const clientKey =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (isRateLimited(clientKey)) {
    return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 });
  }

  let email: string;
  let last4: string;
  try {
    const body = await request.json();
    email = (body.email ?? "").toString().trim().toLowerCase();
    last4 = (body.last4 ?? "").toString().replace(/\D/g, "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email.includes("@") || last4.length !== 4) {
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

  try {
    let matchedSessionId: string | undefined;
    for (const session of await findCandidateSessions(email)) {
      if (await sessionMatches(session, priceId, last4)) {
        matchedSessionId = session.id;
        break;
      }
    }

    if (!matchedSessionId) {
      recordFailure(clientKey);
      return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 403 });
    }

    const cookieHeader = buildArchiveCookieHeader(createArchiveToken());
    const downloadUrl =
      "/api/download?token=" + encodeURIComponent(createDownloadToken(matchedSessionId, priceId));

    return NextResponse.json(
      { message: SUCCESS_MESSAGE, downloadUrl },
      { status: 200, headers: { "Set-Cookie": cookieHeader } }
    );
  } catch (err) {
    // Log the Stripe error type only; never the request body.
    const e = err as { type?: string; message?: string };
    console.error("Purchase recovery error:", e.type, e.message);
    return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 403 });
  }
}
