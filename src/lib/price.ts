import { product } from "@/data/product";
import { stripe } from "@/lib/stripe";

/**
 * Display price for the ebook, read from the active Stripe price so the site
 * always shows what checkout will charge. Falls back to the configured
 * NEXT_PUBLIC_* price if Stripe is unavailable.
 */
export async function getEbookPrice(): Promise<string> {
  const priceId = process.env.STRIPE_PRICE_ID_EBOOK;
  if (!priceId || !process.env.STRIPE_SECRET_KEY) return product.price;
  if (!priceId.startsWith("price_")) {
    console.error("STRIPE_PRICE_ID_EBOOK is not a Stripe price ID (price_...); showing the configured price");
    return product.price;
  }

  try {
    const price = await stripe.prices.retrieve(priceId);
    if (price.unit_amount == null || price.currency !== "usd") return product.price;
    return (price.unit_amount / 100).toFixed(2);
  } catch (error) {
    console.error("Unable to read ebook price from Stripe", error);
    return product.price;
  }
}
