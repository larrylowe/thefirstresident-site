/**
 * Verified ebook purchases, read live from Stripe.
 *
 * The checks here are the ones /api/archive/restore-access has always used
 * (paid Checkout Session for the ebook price, succeeded PaymentIntent, paid and
 * unrefunded charge, card last 4). They live in one place so recovery, the
 * email-code step, the download route and the reminder job all agree on what
 * a valid purchase is. Nothing in Stripe is written.
 */

import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export interface VerifiedPurchase {
  sessionId: string;
  /** Successful payment time (the charge's created time), ms since epoch. */
  paidAt: number;
  /** Email the buyer gave at checkout, used for codes and the reminder. */
  email: string | null;
  last4: string | null;
}

/** Paid ebook Checkout Sessions whose checkout email matches, newest first. */
export async function findCandidateSessions(
  email: string,
  typedEmail: string
): Promise<Stripe.Checkout.Session[]> {
  const found = new Map<string, Stripe.Checkout.Session>();

  // Stripe filters by the email exactly as the buyer typed it at checkout,
  // so try it as typed here and in lowercase.
  for (const candidate of new Set([typedEmail, email])) {
    const result = await stripe.checkout.sessions.list({
      customer_details: { email: candidate },
      status: "complete",
      limit: 20,
    });
    for (const session of result.data) found.set(session.id, session);
  }

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

/**
 * The verified purchase behind a paid session, or null when the session did
 * not buy the ebook, the payment did not succeed, or the charge was refunded.
 */
export async function verifySession(
  session: Stripe.Checkout.Session,
  priceId: string
): Promise<VerifiedPurchase | null> {
  if (session.mode !== "payment" || session.payment_status !== "paid") return null;

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
  if (!lineItems.data.some((item) => item.price?.id === priceId)) return null;

  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
  if (!paymentIntentId) return null;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ["latest_charge"],
  });
  if (paymentIntent.status !== "succeeded") return null;

  const charge = paymentIntent.latest_charge;
  if (!charge || typeof charge === "string") return null;
  if (!charge.paid || charge.refunded || charge.amount_refunded > 0) return null;

  return {
    sessionId: session.id,
    paidAt: charge.created * 1000,
    email: session.customer_details?.email ?? charge.billing_details?.email ?? null,
    last4: charge.payment_method_details?.card?.last4 ?? null,
  };
}

/** Finds the purchase that matches a checkout email and card last 4, or null. */
export async function findPurchase(
  typedEmail: string,
  last4: string,
  priceId: string
): Promise<VerifiedPurchase | null> {
  const email = typedEmail.toLowerCase();
  for (const session of await findCandidateSessions(email, typedEmail)) {
    const purchase = await verifySession(session, priceId);
    if (purchase && purchase.last4 === last4) return purchase;
  }
  return null;
}

/** The verified purchase for a known Checkout Session id, or null. */
export async function getVerifiedPurchase(
  sessionId: string,
  priceId: string
): Promise<VerifiedPurchase | null> {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return verifySession(session, priceId);
}

/** Validates the email and last 4 a customer typed; returns them normalised or null. */
export function parseRecoveryInput(body: unknown): { typedEmail: string; last4: string } | null {
  const b = (body ?? {}) as Record<string, unknown>;
  const typedEmail = (b.email ?? "").toString().trim();
  const last4 = (b.last4 ?? "").toString().replace(/\D/g, "");
  if (!typedEmail.includes("@") || last4.length !== 4) return null;
  return { typedEmail, last4 };
}

/**
 * Successful payment time for a session (the charge's created time), falling
 * back to the session's created time. Used only to date the 14-day window.
 */
export async function getPaidAt(sessionId: string): Promise<number> {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.latest_charge"],
  });
  const pi = session.payment_intent;
  const charge = pi && typeof pi !== "string" ? pi.latest_charge : null;
  if (charge && typeof charge !== "string") return charge.created * 1000;
  return session.created * 1000;
}
