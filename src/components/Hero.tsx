"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";

const VIDEO_EMBED_URL = "https://www.youtube.com/embed/pOdHt66Bue4?autoplay=1&rel=0&modestbranding=1";

function Cover({ className = "", sizes }: { className?: string; sizes: string }) {
  return (
    <div className={`relative aspect-[2/3] border border-antique/40 shadow-[0_24px_60px_rgba(0,0,0,0.7)] ${className}`}>
      <Image
        src="/images/book-cover-final.png"
        alt="The First Resident of Briar Glen, a novel by Larry Lowe: book cover"
        fill
        priority
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

export function Hero({ price }: { price: string }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section id="hero" className="relative overflow-hidden bg-charcoal pt-16 md:min-h-[760px] md:pt-0 lg:min-h-screen">
        {/* Background image — a banner on mobile, full-bleed on desktop */}
        <div className="relative h-[300px] sm:h-[380px] md:absolute md:inset-0 md:h-auto">
          <Image
            src="/images/Section%201%20House.png"
            alt="Briar Glen Residence at night under a stormy sky"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[100%_45%] md:object-[50%_40%] lg:object-[100%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal md:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/25 md:block" />
          <div className="absolute inset-0 hidden bg-gradient-to-t from-charcoal via-transparent to-charcoal/40 md:block" />
        </div>

        {/* From xl up, the right-hand padding keeps the Briar Glen Residence sign clear of the cover.
            The sign sits about 0.12–0.42 × the hero height in from the right edge. */}
        <div className="relative z-10 mx-auto max-w-[1240px] px-5 pb-14 sm:px-8 md:flex md:min-h-[760px] md:items-center md:px-12 md:pb-20 md:pt-40 lg:min-h-screen lg:px-16 xl:max-w-none xl:pl-[max(4rem,calc((100vw-1240px)/2+4rem))] xl:pr-[calc(42vh+4rem)]">
          <div className="grid w-full grid-cols-1 md:grid-cols-[minmax(0,1fr)_200px] md:items-center md:gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_240px]">

            {/* Mobile: cover overlaps the bottom of the house image, price beside it */}
            <div className="-mt-24 mb-6 flex items-end gap-4 sm:gap-6 md:hidden">
              <Cover className="w-[112px] shrink-0 sm:w-[140px]" sizes="140px" />
              <div className="min-w-0 border-l border-antique/30 pb-0.5 pl-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-antique">A Novel by Larry Lowe</p>
                <p className="mt-1.5 font-serif text-[40px] leading-none text-parchment">${price}</p>
                <p className="mt-1.5 text-xs leading-5 text-aged/85">
                  Ebook · instant download<br />+ Whitmore Investigation archive
                </p>
              </div>
            </div>

            <FadeIn>
              <p className="hidden text-[11px] font-medium uppercase tracking-[0.3em] text-antique md:block">
                A Novel by Larry Lowe
              </p>
              <h1 className="font-serif text-[38px] font-normal leading-[1.08] text-parchment sm:text-5xl md:mt-6 md:text-6xl lg:text-7xl">
                Every house has a first resident.{" "}
                <em className="block text-antique max-md:inline">This one never left.</em>
              </h1>
              <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-aged md:text-[22px]">
                Nine-year-old Chelsea Parker knows something is wrong at Briar Glen
                before anyone else is ready to admit it.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BuyButton className="w-full px-6 text-sm sm:w-auto">Buy the Ebook · ${price}</BuyButton>
                <div className="grid grid-cols-2 gap-3 sm:contents">
                  <a
                    href="#prelude"
                    className="inline-flex items-center justify-center border border-antique/80 px-4 py-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-parchment transition hover:bg-antique hover:text-charcoal sm:px-6 sm:text-sm"
                  >
                    <span className="sm:hidden">Read the Prelude</span>
                    <span className="hidden sm:inline">Read the Prelude Free</span>
                  </a>
                  <button
                    onClick={() => setShowVideo(true)}
                    className="inline-flex items-center justify-center gap-2 border border-antique/30 px-4 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-parchment transition hover:border-antique sm:hidden"
                  >
                    <Play size={12} className="fill-antique text-antique" /> Trailer
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowVideo(true)}
                className="group mt-6 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-parchment transition hover:text-antique sm:inline-flex"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-antique/80 transition group-hover:bg-antique/15">
                  <Play size={14} className="translate-x-px fill-parchment text-parchment" />
                </span>
                Watch the Trailer
              </button>

              <p className="mt-6 hidden text-sm text-aged/70 md:block">
                Instant download · Includes the Whitmore Investigation archive
              </p>
            </FadeIn>

            {/* Desktop cover */}
            <FadeIn delay={0.15} className="hidden md:block md:self-end md:translate-y-12 xl:translate-y-0 xl:self-center">
              <Cover className="w-full" sizes="300px" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Video modal — triggered by the hero trailer buttons */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 px-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
              className="absolute -top-10 right-0 text-sm uppercase tracking-[0.2em] text-parchment/70 transition hover:text-parchment"
            >
              Close ✕
            </button>
            <div className="aspect-video w-full overflow-hidden bg-black shadow-2xl">
              <iframe
                src={VIDEO_EMBED_URL}
                title="The First Resident of Briar Glen trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
