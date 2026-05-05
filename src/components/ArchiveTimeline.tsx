"use client";

import Image from "next/image";
import { useState, useId } from "react";
import { timelineEntries, type TimelineEntry } from "@/data/archiveTimeline";
import { ArchiveFileModal } from "./ArchiveFileModal";

// ─────────────────────────────────────────────
// Layout constants — all derived from these two
// ─────────────────────────────────────────────
const MEDALLION = 56;   // px diameter of each numbered circle
const SPINE_X   = 28;   // px from the list-wrapper left edge to the spine centre
                        // (= MEDALLION / 2, so the spine runs through medallion centres)

export function ArchiveTimeline() {
  const [activeEntry, setActiveEntry] = useState<TimelineEntry | null>(null);
  const [modalEntry,  setModalEntry]  = useState<TimelineEntry | null>(null);
  const cardId = useId();

  const activate  = (e: TimelineEntry) =>
    setActiveEntry(prev => prev?.slug === e.slug ? null : e);
  const openModal = (e: TimelineEntry) => setModalEntry(e);
  const closeModal = () => setModalEntry(null);

  return (
    <>
      {/* ── Section ──────────────────────────────────────── */}
      <section
        id="archive-timeline"
        className="relative overflow-hidden bg-charcoal"
        style={{ scrollMarginTop: "80px" }}
        aria-label="The Whitmore Investigation timeline"
      >
        {/* Background artwork */}
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

        {/* ── Content ──────────────────────────────────────── */}
        <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-20 md:px-10 md:py-28">

          {/* ── Header ──────────────────────────────────────── */}
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

          {/* ── Two-column: timeline | card ────────────────── */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">

            {/* ── Left: timeline list ──────────────────────── */}
            {/*
              Layout model (all in normal flow, no absolute positioning):
              ┌──────────────────────────────────────────────────┐
              │ [MEDALLION 56px] [connector 16px] [text flex-1]  │
              └──────────────────────────────────────────────────┘
              The spine is a pseudo-absolute 1px line on the left,
              centred on SPINE_X = 28px = MEDALLION/2.
            */}
            <div
              className="relative flex-1 min-w-0"
              role="list"
              aria-label="Timeline entries"
            >
              {/* Gold spine — runs down behind the medallions */}
              <div
                className="pointer-events-none absolute top-0 bottom-0 w-px bg-gradient-to-b from-antique/10 via-antique/40 to-antique/10"
                style={{ left: SPINE_X }}
                aria-hidden="true"
              />

              {timelineEntries.map((entry, idx) => {
                const isActive = activeEntry?.slug === entry.slug;
                const isLast   = idx === timelineEntries.length - 1;

                return (
                  <div
                    key={entry.slug}
                    role="listitem"
                    className={isLast ? "" : "mb-1"}
                  >
                    <button
                      aria-pressed={isActive}
                      aria-controls={`${cardId}-card`}
                      onClick={() => activate(entry)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          isActive ? openModal(entry) : activate(entry);
                        }
                      }}
                      className={`
                        group flex w-full items-center py-3 pr-3 text-left
                        rounded-sm transition-colors duration-150
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-antique/70
                        ${isActive ? "bg-charcoal/35" : "hover:bg-charcoal/20"}
                      `}
                    >
                      {/* ── Medallion (in flow, fixed width = MEDALLION) ── */}
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

                      {/* ── Short gold connector ──────────────────────── */}
                      <span
                        aria-hidden="true"
                        style={{ width: 16, flexShrink: 0 }}
                        className={`
                          h-px transition-colors duration-300
                          ${isActive ? "bg-antique/65" : "bg-antique/20 group-hover:bg-antique/40"}
                        `}
                      />

                      {/* ── Text block ───────────────────────────────── */}
                      <span className="flex min-w-0 flex-col">
                        {/* Year */}
                        <span className={`
                          text-[10px] uppercase tracking-[0.24em] transition-colors duration-200
                          ${isActive ? "text-antique" : "text-antique/55 group-hover:text-antique/85"}
                        `}>
                          {entry.year}
                        </span>

                        {/* Title */}
                        <span className={`
                          mt-0.5 font-serif text-[15px] leading-snug transition-colors duration-200
                          ${isActive ? "text-parchment" : "text-aged/80 group-hover:text-parchment/90"}
                        `}>
                          {entry.title}
                        </span>

                        {/* Mobile inline summary when active */}
                        {isActive && (
                          <span className="mt-2 block text-sm leading-7 text-aged/80 lg:hidden">
                            {entry.summary}
                            <button
                              onClick={(e) => { e.stopPropagation(); openModal(entry); }}
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
                    <div className="border-b border-antique/20 px-6 py-5">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-antique">
                        {activeEntry.year}
                      </p>
                      <div className="my-2.5 flex items-center gap-2">
                        <div className="h-px w-4 bg-antique/50" />
                        <div className="h-px flex-1 bg-antique/15" />
                      </div>
                      <h3 className="font-serif text-[17px] font-semibold leading-snug text-parchment">
                        {activeEntry.title}
                      </h3>
                    </div>
                    <div className="px-6 py-5">
                      <p className="text-[13px] leading-[1.75] text-aged/85">
                        {activeEntry.summary}
                      </p>
                    </div>
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
