"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { TimelineEntry } from "@/data/archiveTimeline";

interface ArchiveFileModalProps {
  entry: TimelineEntry;
  onClose: () => void;
}

export function ArchiveFileModal({ entry, onClose }: ArchiveFileModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);
  const scrollRef      = useRef<HTMLDivElement>(null);

  const hasDocs = entry.documents && entry.documents.length > 0;

  // Focus management + ESC + focus trap
  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;

      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="file-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/82 px-4 py-10"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/*
        Modal panel.
        max-w-2xl gives enough room for document images to be readable.
        The panel itself scrolls (overflow-y-auto on scrollRef) so
        the sticky header/footer stay in place while images scroll.
      */}
      <div
        className="relative flex w-full max-w-2xl flex-col border border-antique/30 bg-charcoal shadow-2xl my-auto"
        style={{ maxHeight: "calc(100dvh - 80px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Sticky header ───────────────────────────── */}
        <div className="flex shrink-0 items-start justify-between border-b border-antique/20 px-7 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-antique">
              File — {entry.year}
            </p>
            <h2
              id="file-modal-title"
              className="mt-2 font-serif text-xl font-semibold leading-snug tracking-[0.02em] text-parchment"
            >
              {entry.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close file"
            className="ml-4 mt-1 shrink-0 text-aged/60 transition hover:text-antique focus:outline-none focus-visible:ring-2 focus-visible:ring-antique/60"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Scrollable body ──────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-7 py-6"
        >
          {hasDocs ? (
            /* ── Document image viewer ─────────────────── */
            <div className="flex flex-col gap-8">
              {entry.documents.map((doc, i) => (
                <div key={i} className="flex flex-col gap-3">
                  {/* Document label */}
                  <div className="flex items-center gap-3">
                    <div className="h-px w-4 bg-antique/45" />
                    <p className="text-[10px] uppercase tracking-[0.22em] text-antique/75">
                      {doc.label}
                    </p>
                    <div className="h-px flex-1 bg-antique/20" />
                  </div>

                  {/* Document image — full width, no cropping */}
                  <div className="relative w-full border border-antique/15 bg-charcoal/50">
                    <Image
                      src={doc.src}
                      alt={doc.alt}
                      width={800}
                      height={1100}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 768px) 100vw, 672px"
                      priority={i === 0}
                    />
                  </div>
                </div>
              ))}

              {/* Record footer */}
              <p className="text-[10px] uppercase tracking-[0.2em] text-antique/35">
                Record {entry.number.toString().padStart(2, "0")} of 09 — Phase I
              </p>
            </div>
          ) : (
            /* ── Placeholder for records without images yet ── */
            <>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-6 bg-antique/40" />
                <div className="h-1 w-1 rotate-45 bg-antique/50" />
                <div className="h-px flex-1 bg-antique/20" />
              </div>

              <p className="text-sm leading-7 text-aged">{entry.summary}</p>

              <div className="mt-7 border border-antique/20 bg-charcoal/50 px-5 py-5">
                <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-antique/70">
                  Reporter&rsquo;s Note
                </p>
                <p className="text-sm italic leading-7 text-aged/70">
                  This file has been marked for expanded review. Additional clippings,
                  witness fragments, and reporter findings will be added to the protected
                  Archive.
                </p>
              </div>

              <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-antique/40">
                Record {entry.number.toString().padStart(2, "0")} of 09 — Phase I
              </p>
            </>
          )}
        </div>

        {/* ── Sticky footer ────────────────────────────── */}
        <div className="shrink-0 border-t border-antique/20 px-7 py-5">
          <button
            onClick={onClose}
            className="w-full border border-antique/50 py-3 text-[10px] uppercase tracking-[0.26em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-antique/60"
          >
            Close File
          </button>
        </div>
      </div>
    </div>
  );
}
