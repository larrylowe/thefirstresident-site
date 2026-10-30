"use client";

import { useEffect, useState } from "react";

/** Mobile-only buy bar, shown once the hero's own Buy button has scrolled away. */
export function StickyBuyBar({ price }: { price: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const cta = document.getElementById("cta");
    if (!hero) return;
    let pastHero = false;
    let atClose = false;
    const update = () => setVisible(pastHero && !atClose);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        if (entry.target === cta) atClose = entry.isIntersecting;
      }
      update();
    });
    observer.observe(hero);
    if (cta) observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-antique/25 bg-charcoal/95 p-3 backdrop-blur-sm transition-transform duration-300 md:hidden ${visible ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!visible}
    >
      <a
        href="/buy"
        tabIndex={visible ? 0 : -1}
        className="block w-full bg-antique py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-charcoal"
      >
        Buy the Ebook · ${price}
      </a>
    </div>
  );
}
