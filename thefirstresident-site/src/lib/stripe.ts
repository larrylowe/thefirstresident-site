import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY is not set. Checkout will fail until environment variables are configured.");
}

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {
    // Use the official Stripe API version for 2026. This must match one of
    // the supported versions documented by Stripe or Next.js will fail
    // type checking. See https://stripe.com/docs/api/versioning for details.
    apiVersion: "2026-04-22.dahlia",
  },
);
