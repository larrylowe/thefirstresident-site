"use client";

import { useEffect, useState } from "react";

/**
 * Temporary Halloween weekend ribbon. Separate from the permanent design:
 * remove <HalloweenRibbon /> from the Navbar, or set
 * NEXT_PUBLIC_HALLOWEEN_RIBBON=off, to disable it with no other changes.
 *
 *   auto (default) — shown only between the start and end dates below
 *   on             — always shown (for preview review)
 *   off            — never shown
 *
 * The offer and price are unchanged; there is no countdown or deadline.
 */
const MODE = process.env.NEXT_PUBLIC_HALLOWEEN_RIBBON || "auto";
// Halloween weekend, US Eastern time: Fri Oct 30 – Sun Nov 1, 2026
const STARTS = Date.parse("2026-10-30T00:00:00-04:00");
const ENDS = Date.parse("2026-11-02T00:00:00-05:00");

export function HalloweenRibbon() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (MODE === "off") return;
    const now = Date.now();
    setVisible(MODE === "on" || (now >= STARTS && now < ENDS));
  }, []);

  if (!visible) return null;

  return (
    <div className="border-b border-antique/20 bg-[#24170f] px-4 py-2 text-center">
      <p className="text-[11px] leading-5 text-aged sm:text-sm">
        <span className="mr-2 hidden text-[10px] font-medium uppercase tracking-[0.24em] text-parchment sm:inline">
          Halloween Weekend ·
        </span>
        <span className="font-serif italic sm:text-[15px]">
          <span className="sm:hidden">Halloween weekend: read the Prelude free.</span>
          <span className="hidden sm:inline">Read the Prelude free. Then decide whether to go back to Briar Glen.</span>
        </span>
        <a
          href="/#prelude"
          className="ml-3 text-[10px] font-medium uppercase tracking-[0.2em] text-antique underline underline-offset-4 transition hover:text-parchment"
        >
          Read now
        </a>
      </p>
    </div>
  );
}
