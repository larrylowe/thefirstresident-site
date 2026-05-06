"use client";

import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from "lucide-react";
import type { TimelineEntry, ArchiveDocument } from "@/data/archiveTimeline";

// ─── Constants ────────────────────────────────────────────────────────────────
const ZOOM_MIN     = 0.5;
const ZOOM_MAX     = 2.5;
const ZOOM_STEP    = 0.25;
const ZOOM_DEFAULT = 1;

// ─── Single document image ────────────────────────────────────────────────────
//
// Keyed by src at the call site (key={doc.src}) so React fully unmounts and
// remounts this component whenever the image source changes.  That guarantees
// errored state is always fresh — no stale error from a previous file can bleed
// through.
//
function DocImage({ doc, zoom }: { doc: ArchiveDocument; zoom: number }) {
  const [errored, setErrored]   = useState(false);
  const [loaded,  setLoaded]    = useState(false);

  // Belt-and-suspenders reset if the same component instance somehow receives
  // a new src (shouldn't happen given key={doc.src}, but defensive is fine).
  useEffect(() => {
    setErrored(false);
    setLoaded(false);
  }, [doc.src]);

  return (
    /* Viewport: clips height, allows both axes to scroll when zoomed */
    <div
      className="overflow-auto border border-antique/15 bg-charcoal/50"
      style={{ maxHeight: "70vh", width: "100%" }}
    >
      {errored ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-antique/60">
            Image could not be loaded:
          </p>
          <p className="break-all font-mono text-[11px] text-aged/50">{doc.src}</p>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={doc.src}
          alt={doc.alt}
          onLoad={()  => { setLoaded(true);  setErrored(false); }}
          onError={() => { setErrored(true); setLoaded(false);  }}
          style={{
            display:    "block",
            width:      `${zoom * 100}%`,
            maxWidth:   "none",
            height:     "auto",
            margin:     "0 auto",
            // Keep the image invisible until it loads so there's no flash of
            // broken layout — but do not set display:none (that prevents load).
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        />
      )}
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
interface ArchiveFileModalProps {
  entry: TimelineEntry;
  onClose: () => void;
}

export function ArchiveFileModal({ entry, onClose }: ArchiveFileModalProps) {
  const [zoom, setZoom] = useState(ZOOM_DEFAULT);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);

  const hasDocs = Array.isArray(entry.documents) && entry.documents.length > 0;

  const zoomIn    = () => setZoom(z => Math.min(ZOOM_MAX,  parseFloat((z + ZOOM_STEP).toFixed(2))));
  const zoomOut   = () => setZoom(z => Math.max(ZOOM_MIN,  parseFloat((z - ZOOM_STEP).toFixed(2))));
  const zoomReset = () => setZoom(ZOOM_DEFAULT);

  // Reset zoom when file changes
  useEffect(() => { setZoom(ZOOM_DEFAULT); }, [entry.slug]);

  // ESC + focus trap
  useEffect(() => {
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;

      const els = overlayRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!els || els.length === 0) return;
      const first = els[0];
      const last  = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const zoomPct = Math.round(zoom * 100);

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

        {/* ── Sticky header ─────────────────────────────── */}
        <div className="flex shrink-0 items-start justify-between border-b border-antique/20 px-6 py-5">
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

        {/* ── Zoom toolbar ──────────────────────────────── */}
        {hasDocs && (
          <div className="flex shrink-0 items-center gap-2 border-b border-antique/15 bg-charcoal/60 px-6 py-3">
            <button
              onClick={zoomOut}
              disabled={zoom <= ZOOM_MIN}
              aria-label="Zoom out"
              className="flex h-8 w-8 items-center justify-center border border-antique/30 text-aged/70 transition hover:border-antique hover:text-antique disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-antique/60"
            >
              <ZoomOut size={13} />
            </button>

            <button
              onClick={zoomIn}
              disabled={zoom >= ZOOM_MAX}
              aria-label="Zoom in"
              className="flex h-8 w-8 items-center justify-center border border-antique/30 text-aged/70 transition hover:border-antique hover:text-antique disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-antique/60"
            >
              <ZoomIn size={13} />
            </button>

            <span className="min-w-[3rem] text-center text-[11px] tabular-nums text-antique/60">
              {zoomPct}%
            </span>

            <button
              onClick={zoomReset}
              disabled={zoom === ZOOM_DEFAULT}
              aria-label="Reset zoom to 100%"
              className="flex h-8 items-center gap-1.5 border border-antique/30 px-3 text-[10px] uppercase tracking-[0.18em] text-aged/70 transition hover:border-antique hover:text-antique disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-antique/60"
            >
              <RotateCcw size={11} />
              Reset
            </button>

            <span className="ml-auto text-[10px] uppercase tracking-[0.16em] text-antique/35">
              {entry.documents.length === 1
                ? "1 Document"
                : `${entry.documents.length} Documents`}
            </span>
          </div>
        )}

        {/* ── Scrollable body ───────────────────────────── */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          {hasDocs ? (
            <div className="flex flex-col gap-10">
              {entry.documents.map((doc) => (
                // key={doc.src} forces full remount of DocImage when src changes,
                // guaranteeing no stale error state persists between file opens.
                <div key={doc.src} className="flex flex-col gap-3">

                  {/* Label row + Open in New Tab */}
                  <div className="flex items-center gap-3">
                    <div className="h-px w-4 shrink-0 bg-antique/45" />
                    <p className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-antique/75">
                      {doc.label}
                    </p>
                    <div className="h-px flex-1 bg-antique/20" />
                    <a
                      href={doc.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${doc.alt} in new tab`}
                      className="ml-2 flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-antique/50 transition hover:text-antique focus:outline-none focus-visible:ring-1 focus-visible:ring-antique/60"
                    >
                      <ExternalLink size={11} />
                      New tab
                    </a>
                  </div>

                  {/* Image — keyed by src so state is always fresh */}
                  <DocImage key={doc.src} doc={doc} zoom={zoom} />

                </div>
              ))}

              <p className="text-[10px] uppercase tracking-[0.2em] text-antique/30">
                Record {entry.number.toString().padStart(2, "0")} of 09 — Phase I
              </p>
            </div>
          ) : (
            /* Record 9 — no documents yet */
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

        {/* ── Sticky footer ─────────────────────────────── */}
        <div className="shrink-0 border-t border-antique/20 px-6 py-5">
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
