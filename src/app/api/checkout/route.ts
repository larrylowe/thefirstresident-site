import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const priceId = process.env.STRIPE_PRICE_ID_EBOOK;
    if (!priceId) {
      console.error("STRIPE_PRICE_ID_EBOOK is not set");
      return NextResponse.json(
        { error: "Ebook price not configured. Please contact support." },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      line_items: [{ price: priceId, quantity: 1 }],
      // Stripe replaces {CHECKOUT_SESSION_ID} with the real session ID
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
      metadata: {
        product: "the-first-resident-ebook",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
