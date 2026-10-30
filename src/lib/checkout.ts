import { stripe } from "@/lib/stripe";

/**
 * Creates the ebook Checkout Session. Shared by POST /api/checkout and the
 * permanent GET /buy link so both routes start the same checkout.
 */
export async function createEbookCheckoutSession() {
  const priceId = process.env.STRIPE_PRICE_ID_EBOOK;
  if (!priceId) {
    throw new Error("STRIPE_PRICE_ID_EBOOK is not set");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
