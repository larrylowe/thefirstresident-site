"use client";

import Image from "next/image";
import { useState, useId } from "react";
import { timelineEntries, type TimelineEntry } from "@/data/archiveTimeline";
import { ArchiveFileModal } from "./ArchiveFileModal";

// ─── Layout constants ────────────────────────────────────────
const MEDALLION = 56;  // px — circle diameter
const SPINE_X   = 28;  // px — spine centre from list left edge (= MEDALLION / 2)

// Desktop grid:
//   col 1  = label area  (medallion + connector + year/title)  fixed at LABEL_W
//   col 2  = card area   (detail card)                         fixed at CARD_W
//   gap    = 40px
//
// We want the card to sit ~40px to the right of the label text,
// so LABEL_W needs to be just wide enough for the longest title.
// 280px comfortably fits all nine entries at 15px serif.
const LABEL_W = 280; // px
const CARD_W  = 300; // px
const COL_GAP = 40;  // px — gap between label col and card col

export function ArchiveTimeline() {
  const [activeEntry, setActiveEntry] = useState<TimelineEntry | null>(null);
  const [modalEntry,  setModalEntry]  = useState<TimelineEntry | null>(null);
  const sectionId = useId();

  const activate   = (e: TimelineEntry) =>
    setActiveEntry(prev => prev?.slug === e.slug ? null : e);
  const openModal  = (e: TimelineEntry) => setModalEntry(e);
  const closeModal = () => setModalEntry(null);

  return (
    <>
      <section
        id="archive-timeline"
        className="relative overflow-hidden bg-charcoal"
        style={{ scrollMarginTop: "80px" }}
        aria-label="The Whitmore Investigation timeline"
      >
        {/* Background */}
        <div className="absolute inset-0 select-none" aria-hidden="true">
          <Image
            src="/images/archive-timeline-clean.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority={false}
          />
          <div className="absolute inset-0 bg-charcoal/72" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1100px] px-4 py-20 sm:px-8 md:py-28">

          {/* Header */}
          <div className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.36em] text-antique">
              The First Resident Archive
            </p>
            <div className="my-4 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-antique/50" />
              <div className="h-1.5 w-1.5 rotate-45 bg-antique/65" />
              <div className="h-px w-10 bg-antique/50" />
            </div>
            <h2 className="font-serif text-3xl font-semibold tracking-[0.04em] text-parchment sm:text-4xl md:text-[2.8rem]">
              The Whitmore Investigation
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-aged/85 md:text-base">
              A timeline of incidents, records, and inquiries spanning
              generations at Briar Glen.
            </p>
          </div>

          {/*
            ── Timeline ───────────────────────────────────────────────
            DESKTOP (≥ 700px):
              Each row is a CSS grid:
                [label LABEL_W px]  [COL_GAP px gap]  [card CARD_W px]

              The label column holds the button (medallion + short
              connector + year/title). The card column holds the detail
              card — it only occupies real space on the active row;
              inactive rows render nothing there, so there's no phantom
              column forcing extra width.

              A short 32px gold connector runs inside the button, right-
              aligned against the label column's right edge, bridging the
              label → card gap visually.

            MOBILE (< 700px):
              Single column. Card renders inline below the button row.
          */}
          <div
            className="relative"
            role="list"
            aria-label="Timeline entries"
          >
            {/* Gold spine */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 w-px bg-gradient-to-b from-antique/10 via-antique/40 to-antique/10"
              style={{ left: SPINE_X }}
              aria-hidden="true"
            />

            {timelineEntries.map((entry, idx) => {
              const isActive    = activeEntry?.slug === entry.slug;
              const isLast      = idx === timelineEntries.length - 1;
              const cardPanelId = `${sectionId}-card-${entry.slug}`;

              return (
                <div
                  key={entry.slug}
                  role="listitem"
                  className={isLast ? "" : "mb-1"}
                >
                  {/*
                    Row wrapper.
                    Desktop: CSS grid — label col | card col (only has width when active)
                    Mobile:  flex column — button on top, card below when active
                  */}
                  <div
                    className="flex flex-col min-[700px]:grid min-[700px]:items-start"
                    style={{
                      // Desktop grid: label fixed | card fixed; gap COL_GAP px
                      gridTemplateColumns: isActive
                        ? `${LABEL_W}px ${CARD_W}px`
                        : `${LABEL_W}px`,
                      columnGap: COL_GAP,
                    }}
                  >
                    {/* ── Button (label column) ─────────────────── */}
                    <button
                      aria-pressed={isActive}
                      aria-expanded={isActive}
                      aria-controls={cardPanelId}
                      onClick={() => activate(entry)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          isActive ? openModal(entry) : activate(entry);
                        }
                      }}
                      className={`
                        group flex w-full items-center py-3 text-left
                        rounded-sm transition-colors duration-150
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-antique/70
                        ${isActive ? "bg-charcoal/35" : "hover:bg-charcoal/20"}
                      `}
                      // On desktop the button fills col 1 (LABEL_W).
                      // On mobile it's full width.
                      style={{ minWidth: 0 }}
                    >
                      {/* Medallion */}
                      <span
                        style={{ width: MEDALLION, height: MEDALLION, flexShrink: 0 }}
                        className={`
                          relative z-10 flex items-center justify-center
                          rounded-full border-2 font-serif font-semibold
                          transition-all duration-300 select-none
                          ${isActive
                            ? "border-antique bg-charcoal text-antique text-lg shadow-[0_0_22px_5px_rgba(184,142,74,0.50)] scale-110"
                            : "border-antique/45 bg-charcoal/85 text-aged/80 text-base group-hover:border-antique/80 group-hover:text-antique group-hover:shadow-[0_0_14px_3px_rgba(184,142,74,0.28)] group-hover:scale-105"
                          }
                        `}
                        aria-hidden="true"
                      >
                        {entry.number}
                      </span>

                      {/* Medallion → text connector (always present) */}
                      <span
                        aria-hidden="true"
                        className={`h-px transition-colors duration-300 ${
                          isActive ? "bg-antique/65" : "bg-antique/20 group-hover:bg-antique/40"
                        }`}
                        style={{ width: 12, flexShrink: 0 }}
                      />

                      {/* Year + title */}
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className={`
                          text-[10px] uppercase tracking-[0.24em] transition-colors duration-200
                          ${isActive ? "text-antique" : "text-antique/55 group-hover:text-antique/85"}
                        `}>
                          {entry.year}
                        </span>
                        <span className={`
                          mt-0.5 font-serif text-[15px] leading-snug transition-colors duration-200
                          ${isActive ? "text-parchment" : "text-aged/80 group-hover:text-parchment/90"}
                        `}>
                          {entry.title}
                        </span>
                      </span>

                      {/*
                        Active → card connector: 32px gold line, flush right
                        inside the label column, only visible on desktop when active.
                        This visually bridges the gap between the label col and card col.
                      */}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="hidden h-px bg-antique/55 min-[700px]:block"
                          style={{ width: 32, flexShrink: 0 }}
                        />
                      )}
                    </button>

                    {/* ── Detail card (card column on desktop / inline on mobile) ── */}
                    <div
                      id={cardPanelId}
                      role="region"
                      aria-label={`Details: ${entry.title}`}
                      aria-live="polite"
                      className={isActive ? "block" : "hidden"}
                    >
                      {isActive && (
                        /* Mobile: mt-4, full width.  Desktop: no top margin, CARD_W wide. */
                        <div
                          className="mt-4 min-[700px]:mt-0 border border-antique/45 bg-charcoal/90 shadow-[0_0_32px_0_rgba(0,0,0,0.6)] backdrop-blur-sm"
                          style={{ maxWidth: CARD_W }}
                        >
                          {/* Card header */}
                          <div className="border-b border-antique/20 px-5 py-4">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-antique">
                              {entry.year}
                            </p>
                            <div className="my-2 flex items-center gap-2">
                              <div className="h-px w-4 bg-antique/50" />
                              <div className="h-px flex-1 bg-antique/15" />
                            </div>
                            <h3 className="font-serif text-[16px] font-semibold leading-snug text-parchment">
                              {entry.title}
                            </h3>
                          </div>
                          {/* Card body */}
                          <div className="px-5 py-4">
                            <p className="text-[13px] leading-[1.75] text-aged/85">
                              {entry.summary}
                            </p>
                          </div>
                          {/* Open File */}
                          <div className="border-t border-antique/20 px-5 py-3">
                            <button
                              onClick={() => openModal(entry)}
                              className="flex w-full items-center justify-between border border-antique/55 px-4 py-3 text-[10px] uppercase tracking-[0.26em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-antique/70"
                            >
                              <span>Open File</span>
                              <span aria-hidden="true">→</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
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
        </div>
      </section>

      {/* File modal */}
      {modalEntry && (
        <ArchiveFileModal entry={modalEntry} onClose={closeModal} />
      )}
    </>
  );
}
