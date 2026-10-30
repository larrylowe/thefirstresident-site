import { NextRequest, NextResponse } from "next/server";
import { createEbookCheckoutSession, describeCheckoutError } from "@/lib/checkout";

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_PRICE_ID_EBOOK) {
    console.error("STRIPE_PRICE_ID_EBOOK is not set");
    return NextResponse.json(
      { error: "Ebook price not configured. Please contact support." },
      { status: 500 }
    );
  }

  try {
    const session = await createEbookCheckoutSession(request.nextUrl.origin);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", describeCheckoutError(error));
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
