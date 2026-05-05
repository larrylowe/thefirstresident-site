"use client";

import Image from "next/image";
import { BookOpen, Play, ShoppingCart } from "lucide-react";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";
import { useState } from "react";

const sampleUrl = "/samples/first-resident-sample.pdf";
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/pOdHt66Bue4?autoplay=1&rel=0&modestbranding=1";

export function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section id="hero" className="relative min-h-screen overflow-hidden bg-charcoal">
        {/* Full-width background image */}
        <Image
          src="/images/Section%201%20House.png"
          alt="Briar Glen Residence at night under a stormy sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlays — strong left coverage for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/97 via-charcoal/75 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/35" />

        {/* Hero content — three-column grid on desktop */}
        <div className="relative z-10 flex min-h-screen items-center px-6 pt-28 pb-20 md:px-14 lg:px-20">
          <div className="w-full max-w-[1240px] mx-auto grid grid-cols-1 gap-8 md:grid-cols-[minmax(280px,420px)_minmax(210px,250px)_1fr] md:gap-10 md:items-start">

            {/* Column 1: Headline + divider + body copy */}
            <FadeIn>
              <h1 className="font-serif text-4xl font-semibold uppercase leading-[0.9] tracking-[0.05em] text-parchment sm:text-5xl md:text-6xl lg:text-7xl">
                Every house has<br />a first resident.<br />
                <span className="text-antique">This one never left.</span>
              </h1>

              {/* Ornamental divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px w-12 bg-antique/60" />
                <div className="h-1 w-1 rotate-45 bg-antique/70" />
                <div className="h-px w-12 bg-antique/60" />
              </div>

              {/* Body copy */}
              <p className="text-base leading-8 text-aged md:text-[17px]">
                Step into the shadowed past of Briar Glen,<br className="hidden sm:block" />
                where history whispers and something<br className="hidden sm:block" />
                still waits behind the door.
              </p>

              {/* Mobile-only CTA stack (shown below copy on small screens) */}
              <div className="mt-8 flex max-w-[260px] flex-col gap-[10px] md:hidden">
                <a
                  href={sampleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-antique px-5 py-[13px] text-[10px] font-medium uppercase tracking-[0.22em] text-charcoal transition hover:bg-aged"
                >
                  <BookOpen size={13} strokeWidth={2} />
                  Read Free Sample
                </a>
                <button
                  onClick={() => setShowVideo(true)}
                  className="flex w-full items-center justify-center gap-2 border border-antique/70 bg-charcoal/60 px-5 py-[13px] text-[10px] font-medium uppercase tracking-[0.22em] text-parchment transition hover:border-antique hover:bg-charcoal/80"
                >
                  <Play size={13} strokeWidth={2} className="fill-antique text-antique" />
                  Peek Inside Briar Glen
                </button>
                <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:rounded-none [&_button]:border [&_button]:border-antique/70 [&_button]:bg-charcoal/60 [&_button]:py-[13px] [&_button]:text-[10px] [&_button]:tracking-[0.22em] [&_button]:text-parchment [&_button]:transition hover:[&_button]:border-antique hover:[&_button]:bg-charcoal/80">
                  <BuyButton>Buy the Ebook</BuyButton>
                </div>
              </div>
            </FadeIn>

            {/* Column 2: CTA button stack (desktop only, hidden on mobile) */}
            <FadeIn delay={0.1} className="hidden md:flex md:flex-col md:gap-[10px] md:pt-2">

              {/* 1. READ FREE SAMPLE — filled antique gold */}
              <a
                href={sampleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-[10px] bg-antique px-5 py-[15px] text-center text-[10px] font-medium uppercase tracking-[0.22em] text-charcoal transition hover:bg-aged"
              >
                <BookOpen size={13} strokeWidth={2} />
                Read Free Sample
              </a>

              {/* 2. PEEK INSIDE BRIAR GLEN — dark outlined */}
              <button
                onClick={() => setShowVideo(true)}
                className="flex w-full items-center justify-center gap-[10px] border border-antique/70 bg-charcoal/60 px-5 py-[15px] text-[10px] font-medium uppercase tracking-[0.22em] text-parchment transition hover:border-antique hover:bg-charcoal/80"
              >
                <Play size={13} strokeWidth={2} className="fill-antique text-antique" />
                Peek Inside Briar Glen
              </button>

              {/* 3. BUY THE EBOOK — Stripe checkout via BuyButton */}
              <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:rounded-none [&_button]:border [&_button]:border-antique/70 [&_button]:bg-charcoal/60 [&_button]:py-[15px] [&_button]:text-[10px] [&_button]:tracking-[0.22em] [&_button]:text-parchment [&_button]:transition hover:[&_button]:border-antique hover:[&_button]:bg-charcoal/80">
                <BuyButton>
                  <span className="flex items-center justify-center gap-[10px]">
                    <ShoppingCart size={13} strokeWidth={2} />
                    Buy the Ebook
                  </span>
                </BuyButton>
              </div>

            </FadeIn>

            {/* Column 3: Visual breathing room over hero bg — intentionally empty */}
            <div className="hidden md:block" />

          </div>
        </div>
      </section>

      {/* Video modal — triggered by PEEK INSIDE BRIAR GLEN */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
              className="absolute -top-10 right-0 text-parchment/70 transition hover:text-parchment text-sm uppercase tracking-[0.2em]"
            >
              Close ✕
            </button>
            <div className="aspect-video w-full overflow-hidden bg-black shadow-2xl">
              <iframe
                src={VIDEO_EMBED_URL}
                title="The First Resident of Briar Glen video synopsis"
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
