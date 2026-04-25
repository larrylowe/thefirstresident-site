import Stripe from "stripe";

// Warn if secret is missing
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn(
    "STRIPE_SECRET_KEY is not set. Checkout will fail until environment variables are configured."
  );
}

// Create the Stripe client
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {
    apiVersion: "2026-04-22.dahlia",
  }
);