"use client";

import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { product } from "@/data/product";

export function WhyBuyDirect() {
  return (
    <section className="paper-texture bg-parchment py-20 text-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:grid-cols-[0.75fr_1fr] md:px-8">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.28em] text-tobacco">Why Buy Direct</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Why buy direct?</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-lg leading-8 text-ink/82">Buying direct gives you immediate access to the digital edition through a secure one-time checkout, without needing a marketplace account. It also helps keep launch pricing reasonable while making room for future special editions, bundles, and related releases.</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              "Immediate digital access",
              "Secure one-time checkout",
              "Reasonable launch pricing",
              "Future editions and extras"
            ].map((item) => (
              <div key={item} className="border-l border-tobacco/50 pl-4 text-base leading-7 text-ink/80">{item}</div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// LaunchBar
// ---------------------------------------------------------------------------
export function LaunchBar() {
  return (
    <div className="w-full border-b border-antique/20 bg-moss/70 px-5 py-2.5 text-center text-sm text-aged md:px-8">
      <p className="leading-6">
        <span className="font-serif italic text-antique">Launch offer:</span>{" "}
        <a href="#buy" className="font-medium text-parchment underline-offset-2 hover:underline">
          Get the full ebook for ${product.introPrice}
        </a>{" "}
        before the price rises to ${product.regularPrice}.{" "}
        Prefer to sample first?{" "}
        <a href="#sample" className="text-antique underline-offset-2 hover:underline">
          Enter the house for free.
        </a>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PrivacyNotice
// ---------------------------------------------------------------------------
export function PrivacyNotice() {
  return (
    <div
      id="privacy-notice"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-antique/20 bg-charcoal/95 px-5 py-3 backdrop-blur-sm md:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-aged/80">
          We use cookies, pixels, and similar technologies to understand site activity, measure
          advertising performance, and improve future offers. By continuing to use this site, you
          agree to our{" "}
          <Link href="/privacy" className="text-antique underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Link
            href="/privacy"
            className="whitespace-nowrap rounded-sm border border-antique/50 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-aged transition hover:border-antique hover:text-parchment"
          >
            Privacy Policy
          </Link>
          <button
            onClick={() => {
              const el = document.getElementById("privacy-notice");
              if (el) el.style.display = "none";
            }}
            className="whitespace-nowrap rounded-sm bg-antique px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-charcoal transition hover:bg-parchment"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

