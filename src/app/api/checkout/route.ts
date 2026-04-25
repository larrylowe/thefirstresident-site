import { NextResponse } from "next/server";
import { product } from "@/data/product";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const unitAmount = Math.round(Number(product.price) * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: product.title,
              description: `Digital PDF edition by ${product.author}`,
              metadata: {
                title: product.title,
                author: product.author,
                format: product.format
              }
            }
          },
          quantity: 1
        }
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        product: "first-resident-digital-pdf",
        author: product.author
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json({ error: "Unable to create checkout session." }, { status: 500 });
  }
}
