import { NextResponse } from "next/server";
import { createEbookCheckoutSession } from "@/lib/checkout";

export async function POST() {
  if (!process.env.STRIPE_PRICE_ID_EBOOK) {
    console.error("STRIPE_PRICE_ID_EBOOK is not set");
    return NextResponse.json(
      { error: "Ebook price not configured. Please contact support." },
      { status: 500 }
    );
  }

  try {
    const session = await createEbookCheckoutSession();
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
