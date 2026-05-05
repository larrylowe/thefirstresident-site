"use client";

import Image from "next/image";
import { useState, useId } from "react";
import { timelineEntries, type TimelineEntry } from "@/data/archiveTimeline";
import { ArchiveFileModal } from "./ArchiveFileModal";

const MEDALLION = 56; // px — diameter of each numbered circle
const SPINE_X   = 28; // px — from list-wrapper left edge to spine centre

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
        <div className="relative z-10 mx-auto max-w-[1100px] px-4 py-20 sm:px-8 md:py-28">

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

          {/* ── Timeline list ────────────────────────────────
            Layout per row (desktop):
              [medallion 56px] [connector 12px] [year+title flex] [card 300px]

            Layout per row (mobile < 900px):
              [medallion 56px] [connector 12px] [year+title]
                               ↳ card drops inline below when active

            The gold spine runs behind the medallions as a 1px absolute line.
          ── */}
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
              const isActive = activeEntry?.slug === entry.slug;
              const isLast   = idx === timelineEntries.length - 1;
              const cardPanelId = `${sectionId}-card-${entry.slug}`;

              return (
                <div
                  key={entry.slug}
                  role="listitem"
                  className={isLast ? "" : "mb-1"}
                >
                  {/*
                    The outer div is a flex row that holds:
                    - the button (medallion + connector + text) on the left
                    - the detail card on the right (desktop only, hidden on mobile)

                    On desktop (≥ 900px / tw: "min-[900px]") the card slides in
                    to the right of the text on the same row.
                    On mobile the card is rendered below the button as a block.
                  */}
                  <div className="flex flex-col min-[900px]:flex-row min-[900px]:items-start min-[900px]:gap-0">

                    {/* ── Node button ─────────────────────────── */}
                    <button
                      aria-pressed={isActive}
                      aria-expanded={isActive}
                      aria-controls={cardPanelId}
                      onClick={() => activate(entry)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          // Second press on active node opens file modal
                          isActive ? openModal(entry) : activate(entry);
                        }
                      }}
                      className={`
                        group flex w-full items-center py-3 pr-3 text-left
                        rounded-sm transition-colors duration-150
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-antique/70
                        min-[900px]:flex-1 min-[900px]:min-w-0
                        ${isActive ? "bg-charcoal/35" : "hover:bg-charcoal/20"}
                      `}
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

                      {/* Short connector: medallion → text */}
                      <span
                        aria-hidden="true"
                        style={{ width: 12, flexShrink: 0 }}
                        className={`h-px transition-colors duration-300 ${
                          isActive ? "bg-antique/65" : "bg-antique/20 group-hover:bg-antique/40"
                        }`}
                      />

                      {/* Year + title */}
                      <span className="flex min-w-0 flex-col">
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

                      {/* Desktop: long connector from text right-edge → card left-edge */}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="mx-3 hidden h-px flex-1 bg-antique/50 min-[900px]:block"
                          style={{ minWidth: 20, maxWidth: 60 }}
                        />
                      )}
                    </button>

                    {/* ── Detail card ─────────────────────────────
                      Desktop: inline on same row, fixed width, only visible when active.
                      Mobile:  block below the button row, only visible when active.
                    ── */}
                    <div
                      id={cardPanelId}
                      role="region"
                      aria-label={`Details: ${entry.title}`}
                      aria-live="polite"
                      className={`
                        transition-all duration-200
                        ${isActive ? "block" : "hidden"}
                        min-[900px]:w-[280px] min-[900px]:shrink-0
                        w-full
                      `}
                    >
                      {isActive && (
                        <div className="border border-antique/45 bg-charcoal/90 shadow-[0_0_32px_0_rgba(0,0,0,0.6)] backdrop-blur-sm mx-0 mb-2 min-[900px]:mb-0">
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

                  </div>{/* end row */}
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
