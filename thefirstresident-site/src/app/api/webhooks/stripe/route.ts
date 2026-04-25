import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await request.text();

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook signature or secret missing." }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Checkout completed", session.id, session.customer_email);
      // Version 2 fulfillment hook:
      // 1. Confirm metadata.product === "first-resident-digital-pdf".
      // 2. Generate protected or expiring download link.
      // 3. Send delivery email or store order record.
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error", error);
    return NextResponse.json({ error: "Webhook verification failed." }, { status: 400 });
  }
}
