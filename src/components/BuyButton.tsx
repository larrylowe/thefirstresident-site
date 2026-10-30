"use client";

import { useState } from "react";

const variants = {
  gold: "bg-antique text-charcoal hover:bg-aged",
  dark: "bg-[#1c140e] text-parchment hover:bg-charcoal hover:text-antique",
};

/**
 * Every Buy button links to /buy, which starts the existing Stripe checkout
 * server-side. A plain link keeps working before hydration and from any page.
 * `className` sets padding, text size and width (defaults to "px-7 text-sm").
 */
export function BuyButton({
  children = "Buy the Ebook",
  className = "px-7 text-sm",
  variant = "gold",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <a
      href="/buy"
      onClick={() => setLoading(true)}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-sm py-4 text-center font-medium uppercase tracking-[0.18em] transition ${variants[variant]} ${loading ? "pointer-events-none opacity-70" : ""} ${className}`}
    >
      {loading ? "Opening checkout..." : children}
    </a>
  );
}
