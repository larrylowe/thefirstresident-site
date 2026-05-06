"use client";

import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from "lucide-react";
import type { TimelineEntry } from "@/data/archiveTimeline";

const ZOOM_MIN     = 0.5;
const ZOOM_MAX     = 2.5;
const ZOOM_STEP    = 0.25;
const ZOOM_DEFAULT = 1;

interface Props {
  entry: TimelineEntry;
  onClose: () => void;
}

export function ArchiveFileModal({ entry, onClose }: Props) {
  const [zoom, setZoom] = useState(ZOOM_DEFAULT);
  const overlayRef      = useRef<HTMLDivElement>(null);
  const closeRef        = useRef<HTMLButtonElement>(null);

  const hasDocs = Array.isArray(entry.documents) && entry.documents.length > 0;

  const zoomIn    = () => setZoom(z => Math.min(ZOOM_MAX,  parseFloat((z + ZOOM_STEP).toFixed(2))));
  const zoomOut   = () => setZoom(z => Math.max(ZOOM_MIN,  parseFloat((z - ZOOM_STEP).toFixed(2))));
  const zoomReset = () => setZoom(ZOOM_DEFAULT);

  useEffect(() => { setZoom(ZOOM_DEFAULT); }, [entry.slug]);

  useEffect(() => {
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const els = overlayRef.current?.querySelectorAll<HTMLElement>(
        'button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      if (!els?.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

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
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/85 px-4 py-10"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative my-auto flex w-full max-w-2xl flex-col border border-antique/30 bg-charcoal shadow-2xl"
        style={{ maxHeight: "calc(100dvh - 80px)" }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-antique/20 px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-antique">
              File — {entry.year}
            </p>
            <h2
              id="file-modal-title"
              className="mt-2 font-serif text-xl font-semibold leading-snug text-parchment"
            >
              {entry.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close file"
            className="ml-4 mt-1 shrink-0 text-aged/60 transition hover:text-antique focus:outline-none focus-visible:ring-2 focus-visible:ring-antique/60"
          >
            <X size={18} />
          </button>
        </div>

        {/* Zoom toolbar */}
        {hasDocs && (
          <div className="flex shrink-0 items-center gap-2 border-b border-antique/15 bg-charcoal/60 px-6 py-3">
            <button onClick={zoomOut} disabled={zoom <= ZOOM_MIN} aria-label="Zoom out"
              className="flex h-8 w-8 items-center justify-center border border-antique/30 text-aged/70 transition hover:border-antique hover:text-antique disabled:opacity-30 focus:outline-none">
              <ZoomOut size={13} />
            </button>
            <button onClick={zoomIn} disabled={zoom >= ZOOM_MAX} aria-label="Zoom in"
              className="flex h-8 w-8 items-center justify-center border border-antique/30 text-aged/70 transition hover:border-antique hover:text-antique disabled:opacity-30 focus:outline-none">
              <ZoomIn size={13} />
            </button>
            <span className="min-w-[3rem] text-center text-[11px] tabular-nums text-antique/60">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={zoomReset} disabled={zoom === ZOOM_DEFAULT} aria-label="Reset zoom"
              className="flex h-8 items-center gap-1.5 border border-antique/30 px-3 text-[10px] uppercase tracking-[0.18em] text-aged/70 transition hover:border-antique hover:text-antique disabled:opacity-30 focus:outline-none">
              <RotateCcw size={11} /> Reset
            </button>
            <span className="ml-auto text-[10px] uppercase tracking-[0.16em] text-antique/35">
              {entry.documents.length === 1 ? "1 Document" : `${entry.documents.length} Documents`}
            </span>
          </div>
        )}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          {hasDocs ? (
            <div className="flex flex-col gap-10">
              {entry.documents.map((doc, i) => {
                const src = doc.src.trim();
                return (
                  <section key={i}>

                    {/* Label + New Tab */}
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-4 shrink-0 bg-antique/45" />
                      <p className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-antique/75">
                        {doc.label}
                      </p>
                      <div className="h-px flex-1 bg-antique/20" />
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-antique/50 transition hover:text-antique focus:outline-none"
                      >
                        <ExternalLink size={11} /> New tab
                      </a>
                    </div>

                    {/*
                      Viewport: clips height, scrolls both axes.
                      Inner wrapper: sets the actual rendered width so the
                      scroll container knows how wide the content is.
                      Image: fills 100% of the inner wrapper width.
                    */}
                    <div
                      style={{
                        width: "100%",
                        maxHeight: "70vh",
                        overflow: "auto",
                        border: "1px solid rgba(184,142,74,0.15)",
                        background: "rgba(0,0,0,0.3)",
                      }}
                    >
                      <div
                        style={{
                          width: `${zoom * 100}%`,
                          minWidth: `${zoom * 100}%`,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={doc.alt}
                          style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            maxWidth: "none",
                          }}
                        />
                      </div>
                    </div>

                  </section>
                );
              })}

              <p className="text-[10px] uppercase tracking-[0.2em] text-antique/30">
                Record {entry.number.toString().padStart(2, "0")} of 09 — Phase I
              </p>
            </div>
          ) : (
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
                  witness fragments, and reporter findings will be added to the protected Archive.
                </p>
              </div>
              <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-antique/40">
                Record {entry.number.toString().padStart(2, "0")} of 09 — Phase I
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-antique/20 px-6 py-5">
          <button
            onClick={onClose}
            className="w-full border border-antique/50 py-3 text-[10px] uppercase tracking-[0.26em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal focus:outline-none"
          >
            Close File
          </button>
        </div>

      </div>
    </div>
  );
}
