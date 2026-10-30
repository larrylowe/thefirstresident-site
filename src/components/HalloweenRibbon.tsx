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
    <div className="w-full bg-[#C65A24] px-3 py-2 sm:px-4 text-center text-[#1a120c]">
      <p className="text-[10.5px] leading-5 sm:text-sm">
        <span className="mr-1 whitespace-nowrap text-[9.5px] font-semibold uppercase tracking-[0.14em] sm:mr-2 sm:text-[10px] sm:tracking-[0.24em]">
          Halloween Weekend ·
        </span>
        <span className="font-serif italic sm:text-[15px]">
          Read the Prelude free.
          <span className="hidden sm:inline"> Then decide whether to go back to Briar Glen.</span>
        </span>
        <a
          href="/#prelude"
          className="ml-1.5 whitespace-nowrap text-[9.5px] font-semibold uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.2em] underline underline-offset-4 transition hover:text-black sm:ml-3"
        >
          Read now
        </a>
      </p>
    </div>
  );
}
