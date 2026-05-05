"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const sampleUrl = "/samples/first-resident-sample.pdf";

const navLinks = [
  { href: "#hero", label: "Home", external: false },
  { href: sampleUrl, label: "Read a Sample", external: true },
  { href: "#chelsea", label: "The Mystery", external: false },
  { href: "#history", label: "History & Hauntings", external: false },
  { href: "#archives", label: "Investigative Archives", external: false },
  { href: "#commerce", label: "Buy the Ebook", external: false },
  { href: "#cta", label: "Stay Close", external: false },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-antique/20 bg-charcoal/92 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <a
          href="#hero"
          className="shrink-0 font-serif text-[13px] font-medium uppercase leading-[1.4] tracking-[0.14em] text-parchment transition hover:text-antique"
        >
          The First Resident<br />of Briar Glen
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-[11px] uppercase tracking-[0.16em] text-aged/80 transition hover:text-antique"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA — Read Chapter One per spec */}
        <div className="hidden shrink-0 xl:block">
          <a
            href={sampleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-antique/70 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
          >
            Read Chapter One
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
              href={sampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 border border-antique/70 px-6 py-3 text-center text-sm uppercase tracking-[0.2em] text-parchment transition hover:bg-antique hover:text-charcoal"
            >
              Read Chapter One
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
