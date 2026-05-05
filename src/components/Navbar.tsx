"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * Nav links with full-path hrefs so they resolve correctly from any route
 * (both / and /archive).  On the landing page, browsers follow /#hash
 * links by scrolling to the matching element without a full navigation.
 */
const navLinks = [
  { href: "/",         label: "Home",                   external: false },
  { href: "/#sample",  label: "Read a Sample",          external: false },
  { href: "/#mystery", label: "The Mystery",            external: false },
  { href: "/#history", label: "History & Hauntings",    external: false },
  { href: "/archive",  label: "Investigative Archives", external: false },
  { href: "/#buy",     label: "Buy the Ebook",          external: false },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-antique/20 bg-charcoal/92 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-screen-xl items-center justify-between gap-4 px-5 lg:px-8">

        {/* Logo — shrink-0 so it never compresses */}
        <a
          href="/"
          className="shrink-0 font-serif text-[13px] font-medium uppercase leading-[1.4] tracking-[0.14em] text-parchment transition hover:text-antique"
        >
          The First Resident<br />of Briar Glen
        </a>

        {/* Desktop nav links — tighter gap so they fit at 1280px */}
        <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-aged/80 transition hover:text-antique"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 xl:block">
          <a
            href="/#sample"
            className="whitespace-nowrap border border-antique/70 px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
          >
            Read Free Sample
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="xl:hidden text-parchment transition hover:text-antique"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-antique/20 bg-charcoal px-6 py-7 xl:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.18em] text-aged transition hover:text-antique"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#sample"
              onClick={() => setOpen(false)}
              className="mt-3 border border-antique/70 px-6 py-3 text-center text-sm uppercase tracking-[0.2em] text-parchment transition hover:bg-antique hover:text-charcoal"
            >
              Read Free Sample
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
