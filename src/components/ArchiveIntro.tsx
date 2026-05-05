"use client";

import { FadeIn } from "./FadeIn";

interface ArchiveIntroProps {
  onEnter: () => void;
}

export function ArchiveIntro({ onEnter }: ArchiveIntroProps) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-6 py-28 text-center">
      <FadeIn className="max-w-xl">
        {/* Label */}
        <p className="text-[10px] uppercase tracking-[0.32em] text-antique">
          The First Resident Archive
        </p>

        {/* Ornamental divider */}
        <div className="my-5 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-antique/50" />
          <div className="h-1.5 w-1.5 rotate-45 bg-antique/70" />
          <div className="h-px w-10 bg-antique/50" />
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-[0.03em] text-parchment md:text-5xl">
          The Whitmore Investigation
        </h1>

        <div className="my-7 h-px w-14 bg-antique/40 mx-auto" />

        {/* Opening paragraph */}
        <p className="text-base leading-8 text-aged md:text-[17px]">
          Welcome. You've been granted access to the Briar Glen Archive: The Whitmore
          Investigation. Inside are records, clippings, witness accounts, and fragments
          gathered across generations. Some explain the legend. Others deepen it.
        </p>

        {/* Spoiler warning */}
        <div className="mt-8 border border-antique/30 px-5 py-3 mx-auto max-w-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-antique/80">
            ⚠ Potential spoilers ahead. Enter at your own discretion.
          </p>
        </div>

        {/* Enter CTA */}
        <button
          onClick={onEnter}
          className="mt-10 border border-antique/70 px-10 py-4 text-[11px] uppercase tracking-[0.26em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
        >
          Enter the Records
        </button>
      </FadeIn>
    </section>
  );
}
