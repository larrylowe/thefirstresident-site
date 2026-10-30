import { stripe } from "@/lib/stripe";

/**
 * Site URL that Stripe returns visitors to. Preview deployments return to
 * their own preview domain; production uses NEXT_PUBLIC_SITE_URL.
 */
function returnBaseUrl(requestOrigin?: string) {
  if (process.env.VERCEL_ENV === "preview" && requestOrigin) return requestOrigin;
  return process.env.NEXT_PUBLIC_SITE_URL || requestOrigin || "http://localhost:3000";
}

/**
 * Creates the ebook Checkout Session. Shared by POST /api/checkout and the
 * permanent GET /buy link so both routes start the same checkout.
 */
export async function createEbookCheckoutSession(requestOrigin?: string) {
  const priceId = process.env.STRIPE_PRICE_ID_EBOOK;
  if (!priceId) {
    throw new Error("STRIPE_PRICE_ID_EBOOK is not set");
  }

  const siteUrl = returnBaseUrl(requestOrigin);

  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    line_items: [{ price: priceId, quantity: 1 }],
    // Stripe replaces {CHECKOUT_SESSION_ID} with the real session ID
    success_url: `${siteUrl}/archive/claim?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/`,
    metadata: {
      product: "the-first-resident-ebook",
    },
  });
}

/** Non-secret summary of a checkout failure for server logs. */
export function describeCheckoutError(error: unknown) {
  if (error && typeof error === "object") {
    const e = error as { type?: string; code?: string; param?: string; statusCode?: number; message?: string };
    return { type: e.type, code: e.code, param: e.param, statusCode: e.statusCode, message: e.message };
  }
  return { message: String(error) };
}
