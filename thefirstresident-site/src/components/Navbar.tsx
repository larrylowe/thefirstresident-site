"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#story", label: "Story" },
  { href: "#watch", label: "Watch" },
  { href: "#sample", label: "Sample" },
  { href: "#buy", label: "Buy" },
  { href: "#author", label: "Author" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-antique/20 bg-charcoal/88 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-serif text-lg uppercase leading-none tracking-[0.18em] text-parchment">
          The First Resident<br />of Briar Glen
        </a>
        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm uppercase tracking-[0.18em] text-aged transition hover:text-antique">
              {link.label}
            </a>
          ))}
          <a href="#buy" className="rounded-full border border-antique px-5 py-2 text-sm uppercase tracking-[0.16em] text-parchment transition hover:bg-antique hover:text-charcoal">
            Buy the Ebook
          </a>
        </div>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-antique/20 bg-charcoal px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="uppercase tracking-[0.18em] text-aged">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
