"use client";

import Image from "next/image";
import { useState, useId } from "react";
import { timelineEntries, type TimelineEntry } from "@/data/archiveTimeline";
import { ArchiveFileModal } from "./ArchiveFileModal";

// ─────────────────────────────────────────────
// Layout constants
// ─────────────────────────────────────────────
// The spine sits at a fixed left offset inside the timeline column.
// Medallions are centred on the spine.
const SPINE_LEFT = 36; // px — distance from column left edge to spine centre
const MEDALLION_SIZE = 56; // px — diameter of the numbered circle buttons

export function ArchiveTimeline() {
  const [activeEntry, setActiveEntry] = useState<TimelineEntry | null>(null);
  const [modalEntry, setModalEntry] = useState<TimelineEntry | null>(null);
  const cardId = useId();

  function activate(entry: TimelineEntry) {
    setActiveEntry((prev) => (prev?.slug === entry.slug ? null : entry));
  }

  function openModal(entry: TimelineEntry) {
    setModalEntry(entry);
  }

  function closeModal() {
    setModalEntry(null);
  }

  return (
    <>
      {/* ── Section wrapper ───────────────────────────────── */}
      <section
        id="archive-timeline"
        className="relative overflow-hidden bg-charcoal"
        style={{ scrollMarginTop: "80px" }}
        aria-label="The Whitmore Investigation timeline"
      >
        {/* Background artwork — pure image, no baked-in text */}
        <div className="absolute inset-0 select-none" aria-hidden="true">
          <Image
            src="/images/archive-timeline-clean.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority={false}
          />
          {/* Dark scrim for legibility — heavier than before */}
          <div className="absolute inset-0 bg-charcoal/72" />
        </div>

        {/* ── Page content ──────────────────────────────────── */}
        <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-20 md:px-10 md:py-28">

          {/* ── Header ──────────────────────────────────────── */}
          <div className="mb-16 text-center">
            {/* Label */}
            <p className="text-[10px] uppercase tracking-[0.36em] text-antique">
              The First Resident Archive
            </p>

            {/* Ornament */}
            <div className="my-4 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-antique/50" />
              <div className="h-1.5 w-1.5 rotate-45 bg-antique/65" />
              <div className="h-px w-10 bg-antique/50" />
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl font-semibold tracking-[0.04em] text-parchment sm:text-4xl md:text-[2.8rem]">
              The Whitmore Investigation
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-aged/85 md:text-base">
              A timeline of incidents, records, and inquiries spanning
              generations at Briar Glen.
            </p>
          </div>

          {/* ── Two-column layout: timeline | card ────────── */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">

            {/* ── Left: vertical timeline ─────────────────── */}
            <div
              className="relative flex-1 min-w-0"
              style={{ paddingLeft: SPINE_LEFT + MEDALLION_SIZE / 2 + 24 }}
              role="list"
              aria-label="Timeline entries"
            >
              {/* Gold spine — positioned so it runs through medallion centres */}
              <div
                className="pointer-events-none absolute top-0 bottom-0 w-px bg-gradient-to-b from-antique/15 via-antique/45 to-antique/15"
                style={{ left: SPINE_LEFT }}
                aria-hidden="true"
              />

              {timelineEntries.map((entry, idx) => {
                const isActive = activeEntry?.slug === entry.slug;
                const isLast = idx === timelineEntries.length - 1;

                return (
                  <div
                    key={entry.slug}
                    role="listitem"
                    className={`relative ${isLast ? "mb-0" : "mb-1"}`}
                  >
                    {/* ── Node button ───────────────────── */}
                    <button
                      aria-pressed={isActive}
                      aria-controls={`${cardId}-card`}
                      onClick={() => activate(entry)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (isActive) openModal(entry);
                          else activate(entry);
                        }
                      }}
                      className={`
                        group relative flex w-full items-center gap-0 py-3 text-left
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-antique/70
                        transition-colors duration-150
                        ${isActive ? "rounded-sm bg-charcoal/35" : "hover:bg-charcoal/20 rounded-sm"}
                      `}
                      style={{ paddingLeft: 0 }}
                    >
                      {/* Medallion — absolutely positioned on the spine */}
                      <span
                        className={`
                          absolute flex items-center justify-center
                          rounded-full border-2 font-serif font-semibold
                          transition-all duration-300 select-none
                          ${
                            isActive
                              ? "border-antique bg-charcoal text-antique text-lg shadow-[0_0_22px_5px_rgba(184,142,74,0.50)] scale-110"
                              : "border-antique/45 bg-charcoal/85 text-aged/80 text-base group-hover:border-antique/80 group-hover:text-antique group-hover:shadow-[0_0_14px_3px_rgba(184,142,74,0.30)] group-hover:scale-105"
                          }
                        `}
                        style={{
                          width: MEDALLION_SIZE,
                          height: MEDALLION_SIZE,
                          left: -(MEDALLION_SIZE / 2 + 24),
                          top: "50%",
                          transform: isActive
                            ? "translateY(-50%) scale(1.10)"
                            : "translateY(-50%)",
                        }}
                        aria-hidden="true"
                      >
                        {entry.number}
                      </span>

                      {/* Short horizontal connector from medallion to text */}
                      <span
                        className={`
                          absolute h-px w-5 transition-colors duration-300
                          ${isActive ? "bg-antique/70" : "bg-antique/25 group-hover:bg-antique/45"}
                        `}
                        style={{ left: -(24 - MEDALLION_SIZE / 2) + MEDALLION_SIZE / 2 - 20, top: "50%" }}
                        aria-hidden="true"
                      />

                      {/* Text block */}
                      <span className="flex flex-col pr-3">
                        {/* Year */}
                        <span
                          className={`text-[10px] uppercase tracking-[0.24em] transition-colors duration-200 ${
                            isActive
                              ? "text-antique"
                              : "text-antique/55 group-hover:text-antique/85"
                          }`}
                        >
                          {entry.year}
                        </span>

                        {/* Title */}
                        <span
                          className={`mt-0.5 font-serif text-[15px] leading-snug transition-colors duration-200 ${
                            isActive
                              ? "text-parchment"
                              : "text-aged/80 group-hover:text-parchment/90"
                          }`}
                        >
                          {entry.title}
                        </span>

                        {/* Summary — visible inline on mobile when active, hidden on desktop */}
                        {isActive && (
                          <span className="mt-2 block text-sm leading-7 text-aged/80 lg:hidden">
                            {entry.summary}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal(entry);
                              }}
                              className="mt-3 flex items-center gap-2 border border-antique/55 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
                            >
                              Open File <span aria-hidden="true">→</span>
                            </button>
                          </span>
                        )}
                      </span>
                    </button>
                  </div>
                );
              })}

              {/* Bottom instruction */}
              <div className="mt-10 border-t border-antique/15 pt-7 text-center sm:text-left">
                <p className="font-serif text-sm italic text-aged/55">
                  Select a record to open the file.
                </p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-antique/35">
                  Some files contain sensitive material.
                </p>
              </div>
            </div>

            {/* ── Right: sticky summary card (desktop only) ── */}
            <div
              id={`${cardId}-card`}
              className="hidden lg:block lg:w-[280px] xl:w-[300px] shrink-0"
              role="region"
              aria-live="polite"
              aria-label="Selected record summary"
            >
              <div className="sticky top-28">
                {activeEntry ? (
                  <div
                    key={activeEntry.slug}
                    className="border border-antique/45 bg-charcoal/88 shadow-[0_0_40px_0_rgba(0,0,0,0.7)] backdrop-blur-sm"
                  >
                    {/* Card top bar */}
                    <div className="border-b border-antique/20 px-6 py-5">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-antique">
                        {activeEntry.year}
                      </p>
                      <div className="my-2.5 flex items-center gap-2">
                        <div className="h-px w-4 bg-antique/50" />
                        <div className="h-px flex-1 bg-antique/18" />
                      </div>
                      <h3 className="font-serif text-[17px] font-semibold leading-snug text-parchment">
                        {activeEntry.title}
                      </h3>
                    </div>

                    {/* Card body */}
                    <div className="px-6 py-5">
                      <p className="text-[13px] leading-[1.75] text-aged/85">
                        {activeEntry.summary}
                      </p>
                    </div>

                    {/* Open File button */}
                    <div className="border-t border-antique/20 px-6 py-4">
                      <button
                        onClick={() => openModal(activeEntry)}
                        className="flex w-full items-center justify-between border border-antique/55 px-5 py-3 text-[10px] uppercase tracking-[0.26em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
                      >
                        <span>Open File</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Placeholder when nothing selected */
                  <div className="border border-antique/15 bg-charcoal/40 px-6 py-8 text-center">
                    <div className="mb-4 flex items-center justify-center gap-2 opacity-40">
                      <div className="h-px w-6 bg-antique" />
                      <div className="h-1 w-1 rotate-45 bg-antique" />
                      <div className="h-px w-6 bg-antique" />
                    </div>
                    <p className="font-serif text-sm italic text-aged/40">
                      Select a record to view the file summary.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* File modal */}
      {modalEntry && (
        <ArchiveFileModal entry={modalEntry} onClose={closeModal} />
      )}
    </>
  );
}
