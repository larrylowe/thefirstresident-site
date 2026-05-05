"use client";

import Image from "next/image";
import { useState, useRef, useId } from "react";
import { timelineEntries, type TimelineEntry } from "@/data/archiveTimeline";
import { ArchiveFileModal } from "./ArchiveFileModal";
import { FadeIn } from "./FadeIn";

export function ArchiveTimeline() {
  const [activeEntry, setActiveEntry] = useState<TimelineEntry | null>(null);
  const [modalEntry, setModalEntry] = useState<TimelineEntry | null>(null);
  const cardDescId = useId();
  const sectionRef = useRef<HTMLElement>(null);

  function openModal(entry: TimelineEntry) {
    setModalEntry(entry);
  }

  function closeModal() {
    setModalEntry(null);
  }

  return (
    <>
      <section
        id="archive-timeline"
        ref={sectionRef}
        className="relative overflow-hidden bg-charcoal"
        style={{ scrollMarginTop: "80px" }}
        aria-label="The Whitmore Investigation timeline"
      >
        {/* Timeline background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/archive-timeline-clean.png"
            alt="Archival records and documents from the Briar Glen Archive"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority={false}
          />
          {/* Overlay to ensure text legibility */}
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">

          {/* Section header */}
          <FadeIn className="mb-14 text-center">
            <p className="text-[10px] uppercase tracking-[0.32em] text-antique">
              The First Resident Archive
            </p>
            <div className="my-4 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-antique/50" />
              <div className="h-1 w-1 rotate-45 bg-antique/60" />
              <div className="h-px w-8 bg-antique/50" />
            </div>
            <h2 className="font-serif text-3xl font-semibold tracking-[0.03em] text-parchment md:text-5xl">
              The Whitmore Investigation
            </h2>
            <p className="mt-5 text-sm leading-8 text-aged md:text-base">
              A timeline of incidents, records, and inquiries spanning generations at Briar Glen.
            </p>
          </FadeIn>

          {/* Timeline + hover card layout */}
          <div className="flex flex-col gap-0 lg:flex-row lg:gap-10">

            {/* Timeline column */}
            <div
              className="relative flex-1"
              role="list"
              aria-label="Timeline entries"
            >
              {/* Vertical spine line */}
              <div className="absolute left-[26px] top-0 h-full w-px bg-antique/25 hidden sm:block" />

              {timelineEntries.map((entry) => {
                const isActive = activeEntry?.slug === entry.slug;

                return (
                  <div
                    key={entry.slug}
                    role="listitem"
                    className="relative mb-2"
                  >
                    <button
                      aria-expanded={isActive}
                      aria-controls={`card-${entry.slug}`}
                      aria-describedby={isActive ? cardDescId : undefined}
                      onClick={() =>
                        setActiveEntry(isActive ? null : entry)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          // Enter/Space on an already-active node opens the modal
                          if (isActive) {
                            openModal(entry);
                          } else {
                            setActiveEntry(entry);
                          }
                        }
                      }}
                      className={`
                        group relative flex w-full items-start gap-5 rounded-none px-3 py-4 text-left
                        transition-all duration-200
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-antique/60
                        ${isActive ? "bg-charcoal/40" : "hover:bg-charcoal/30"}
                      `}
                    >
                      {/* Numbered medallion */}
                      <span
                        className={`
                          relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center
                          rounded-full border-2 font-serif text-base font-semibold transition-all duration-300
                          ${
                            isActive
                              ? "border-antique bg-charcoal text-antique shadow-[0_0_18px_3px_rgba(184,142,74,0.45)]"
                              : "border-antique/40 bg-charcoal/80 text-aged group-hover:border-antique group-hover:text-antique group-hover:shadow-[0_0_12px_2px_rgba(184,142,74,0.3)]"
                          }
                        `}
                        aria-hidden="true"
                      >
                        {entry.number}
                      </span>

                      {/* Text block */}
                      <span className="flex flex-col pt-1">
                        <span
                          className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                            isActive ? "text-antique" : "text-antique/60 group-hover:text-antique"
                          }`}
                        >
                          {entry.year}
                        </span>
                        <span
                          className={`mt-1 font-serif text-base leading-snug transition-colors duration-200 ${
                            isActive ? "text-parchment" : "text-aged group-hover:text-parchment"
                          }`}
                        >
                          {entry.title}
                        </span>

                        {/* Mobile: inline summary (visible when active on small screens) */}
                        <span
                          id={`card-${entry.slug}`}
                          className={`lg:hidden mt-3 text-sm leading-7 text-aged/80 transition-all duration-300 ${
                            isActive ? "block" : "hidden"
                          }`}
                        >
                          {entry.summary}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(entry);
                            }}
                            className="mt-3 flex items-center gap-2 border border-antique/60 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
                          >
                            Open File →
                          </button>
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}

              {/* Bottom instruction */}
              <div className="mt-8 pl-3 text-center sm:text-left">
                <p className="font-serif text-sm italic text-aged/60">
                  Select a record to open the file.
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-antique/40">
                  Some files contain sensitive material.
                </p>
              </div>
            </div>

            {/* Hover / focus card — desktop only */}
            <div className="hidden lg:block lg:w-72 xl:w-80">
              <div className="sticky top-28">
                {activeEntry ? (
                  <div
                    key={activeEntry.slug}
                    id={`card-${activeEntry.slug}`}
                    role="region"
                    aria-label={`Details for ${activeEntry.title}`}
                    className="border border-antique/40 bg-charcoal/80 p-6 shadow-[0_0_32px_0_rgba(0,0,0,0.6)] backdrop-blur-sm animate-in fade-in duration-200"
                  >
                    {/* Card header */}
                    <p className="text-[10px] uppercase tracking-[0.26em] text-antique">
                      {activeEntry.year}
                    </p>
                    <div className="my-3 flex items-center gap-2">
                      <div className="h-px w-5 bg-antique/40" />
                      <div className="h-px flex-1 bg-antique/15" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold leading-snug text-parchment">
                      {activeEntry.title}
                    </h3>
                    <div className="my-4 h-px bg-antique/20" />
                    {/* Summary */}
                    <p
                      id={cardDescId}
                      className="text-sm leading-7 text-aged/85"
                    >
                      {activeEntry.summary}
                    </p>
                    {/* Open File button */}
                    <button
                      onClick={() => openModal(activeEntry)}
                      className="mt-6 flex w-full items-center justify-between border border-antique/60 px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
                    >
                      <span>Open File</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                ) : (
                  <div className="border border-antique/15 bg-charcoal/40 p-6 text-center">
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
