"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { TimelineEntry } from "@/data/archiveTimeline";

interface ArchiveFileModalProps {
  entry: TimelineEntry;
  onClose: () => void;
}

export function ArchiveFileModal({ entry, onClose }: ArchiveFileModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Trap focus and handle ESC
  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();

      // Basic focus trap — keep focus inside the modal
      if (e.key === "Tab") {
        const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is open
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg border border-antique/30 bg-charcoal shadow-2xl">

        {/* Header bar */}
        <div className="flex items-start justify-between border-b border-antique/20 px-7 py-5">
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
            className="ml-4 mt-1 shrink-0 text-aged/60 transition hover:text-antique"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {/* Ornamental rule */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-6 bg-antique/40" />
            <div className="h-1 w-1 rotate-45 bg-antique/50" />
            <div className="h-px flex-1 bg-antique/20" />
          </div>

          {/* Summary */}
          <p className="text-sm leading-7 text-aged">{entry.summary}</p>

          {/* Reporter's Note */}
          <div className="mt-7 border border-antique/20 bg-charcoal/50 px-5 py-5">
            <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-antique/70">
              Reporter&rsquo;s Note
            </p>
            <p className="text-sm italic leading-7 text-aged/70">
              This file has been marked for expanded review. Additional clippings, witness
              fragments, and reporter findings will be added to the protected Archive.
            </p>
          </div>

          {/* File number */}
          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-antique/40">
            Record {entry.number.toString().padStart(2, "0")} of 09 — Phase I
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-antique/20 px-7 py-5">
          <button
            onClick={onClose}
            className="w-full border border-antique/50 py-3 text-[10px] uppercase tracking-[0.26em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
          >
            Close File
          </button>
        </div>

      </div>
    </div>
  );
}
