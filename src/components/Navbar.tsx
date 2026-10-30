"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HalloweenRibbon } from "./HalloweenRibbon";

/**
 * Nav links with full-path hrefs so they resolve correctly from any route
 * (both / and /archive).  On the landing page, browsers follow /#hash
 * links by scrolling to the matching element without a full navigation.
 */
const navLinks = [
  { href: "/#story",   label: "The Story" },
  { href: "/#trailer", label: "Trailer" },
  { href: "/#prelude", label: "Read the Prelude" },
  { href: "/#history", label: "History" },
  { href: "/archive",  label: "Archive" },
];

export function Navbar({ price }: { price?: string }) {
  const [open, setOpen] = useState(false);
  const priceLabel = price ? ` · $${price}` : "";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-antique/20 bg-charcoal/92 backdrop-blur-md">
      <HalloweenRibbon />
      <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-4 px-4 sm:px-5 md:h-20 lg:px-8">

        {/* Logo — shrink-0 so it never compresses */}
        <a
          href="/"
          className="min-w-0 shrink font-serif text-[15px] font-medium uppercase leading-tight tracking-[0.12em] text-parchment transition hover:text-antique sm:text-lg"
        >
          The First Resident
          <span className="hidden text-[0.72em] tracking-[0.16em] text-aged/70 sm:inline"> of Briar Glen</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 xl:flex 2xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-[11px] uppercase tracking-[0.16em] text-aged/85 transition hover:text-antique"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {/* Buy CTA — always visible */}
          <a
            href="/buy"
            className="whitespace-nowrap bg-antique px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-charcoal transition hover:bg-aged sm:px-4 sm:py-2.5 md:text-[11px]"
          >
            <span className="xl:hidden">Buy{price ? ` $${price}` : " the Ebook"}</span>
            <span className="hidden xl:inline">Buy the Ebook{priceLabel}</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="text-parchment transition hover:text-antique xl:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-antique/20 bg-charcoal px-6 py-7 xl:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.18em] text-aged transition hover:text-antique"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/buy"
              onClick={() => setOpen(false)}
              className="mt-3 bg-antique px-6 py-3 text-center text-sm uppercase tracking-[0.2em] text-charcoal transition hover:bg-aged"
            >
              Buy the Ebook{priceLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
