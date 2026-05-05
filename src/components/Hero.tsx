"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { FadeIn } from "./FadeIn";

const sampleUrl = "/samples/first-resident-sample.pdf";
const EMBED_URL = "https://www.youtube.com/embed/1CNQZFo5_Yc";

export function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [buyError, setBuyError] = useState("");

  async function handleBuy() {
    setBuyLoading(true);
    setBuyError("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout could not be started.");
      window.location.href = data.url;
    } catch (err) {
      setBuyError(err instanceof Error ? err.message : "Checkout could not be started.");
      setBuyLoading(false);
    }
  }

  return (
    <>
      {/* Full-screen video modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/96 px-4"
          onClick={() => setShowVideo(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setShowVideo(false); }}
            aria-label="Close video"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-antique/30 text-parchment transition hover:border-antique hover:text-antique"
          >
            <X size={20} />
          </button>
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full">
              <iframe
                src={EMBED_URL + "?autoplay=1&rel=0&modestbranding=1"}
                title="The First Resident of Briar Glen - Video Synopsis"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero section */}
      <section id="hero" className="relative min-h-screen overflow-hidden bg-charcoal">
        <Image
          src="/images/Section%201%20House.png"
          alt="Briar Glen Residence at night under a stormy sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Strong left gradient so headline and buttons are always legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/97 via-charcoal/75 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/35" />

        {/* Hero content — single column, left-aligned, buttons directly under copy */}
        <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-28 pb-20 md:px-14 lg:px-20">
          <FadeIn className="max-w-xl">

            {/* Headline */}
            <h1 className="font-serif text-4xl font-semibold uppercase leading-[0.9] tracking-[0.05em] text-parchment sm:text-5xl md:text-6xl lg:text-7xl">
              Every house has<br />a first resident.<br />
              <span className="text-antique">This one never left.</span>
            </h1>

            {/* Ornament */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px w-12 bg-antique/60" />
              <div className="h-1 w-1 rotate-45 bg-antique/70" />
              <div className="h-px w-12 bg-antique/60" />
            </div>

            {/* Supporting copy */}
            <p className="text-base leading-8 text-aged md:text-[17px]">
              Step into the shadowed past of Briar Glen,<br className="hidden sm:block" />
              where history whispers and something<br className="hidden sm:block" />
              still waits behind the door.
            </p>

            {/* CTA buttons — stacked directly beneath the copy */}
            <div className="mt-10 flex max-w-[300px] flex-col gap-[10px]">

              {/* 1. READ FREE SAMPLE — primary, gold */}
              <a
                href={sampleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center bg-antique px-6 py-[14px] text-center text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal transition hover:bg-aged"
              >
                Read Free Sample
              </a>

              {/* 2. PEEK INSIDE BRIAR GLEN — opens video modal */}
              <button
                onClick={() => setShowVideo(true)}
                className="flex w-full items-center justify-center gap-2.5 border border-antique/70 px-6 py-[14px] text-[11px] uppercase tracking-[0.22em] text-parchment transition hover:border-antique hover:bg-antique/10"
              >
                <Play className="h-3 w-3 flex-shrink-0 fill-antique text-antique" />
                Peek Inside Briar Glen
              </button>

              {/* 3. BUY THE EBOOK — Stripe checkout */}
              <button
                onClick={handleBuy}
                disabled={buyLoading}
                className="flex w-full items-center justify-center border border-parchment/55 px-6 py-[14px] text-[11px] uppercase tracking-[0.22em] text-parchment transition hover:border-parchment/90 hover:bg-parchment/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {buyLoading ? "Opening checkout..." : "Buy the Ebook"}
              </button>

              {buyError && (
                <p className="mt-1 text-center text-xs text-red-300">{buyError}</p>
              )}

            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
