"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";

const EMBED_URL = "https://www.youtube.com/embed/pOdHt66Bue4";

/** Emma (as she appears at Briar Glen Residence in 1984), paired with the trailer. */
export function VideoSection({ price }: { price: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="emma" className="relative overflow-hidden border-t border-antique/10 bg-[#0d0b09]" style={{ scrollMarginTop: "80px" }}>
      {/* Stable anchors for #trailer and older #video links */}
      <span id="trailer" aria-hidden="true" className="absolute top-0" />
      <span id="video" aria-hidden="true" className="absolute top-0" />
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12 md:px-12 md:py-24 lg:px-16">

        {/* Text column — after the player on mobile */}
        <FadeIn className="order-2 lg:order-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-antique">Emma</p>
          <h2 className="mt-5 font-serif text-4xl font-normal leading-tight text-parchment md:text-5xl lg:text-[56px]">
            She&rsquo;s been waiting.
          </h2>
          <p className="mt-6 font-serif text-2xl italic leading-snug text-antique md:text-[26px]">
            Among the residents of Briar Glen was a woman named Emma. Nobody seemed to
            remember when she arrived, and nobody was particularly interested in explaining
            why she never joined the others for supper.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BuyButton className="px-6 text-xs">Buy the Ebook · ${price}</BuyButton>
            <a
              href="#prelude"
              className="inline-flex items-center justify-center border border-antique/80 px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-parchment transition hover:bg-antique hover:text-charcoal"
            >
              Read Free
            </a>
          </div>
        </FadeIn>

        {/* Trailer — thumbnail first, the YouTube player loads only on tap */}
        <FadeIn delay={0.1} className="order-1 lg:order-2">
          <div className="relative aspect-video w-full overflow-hidden border border-antique/25 bg-black shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
            {playing ? (
              <iframe
                src={`${EMBED_URL}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title="The First Resident of Briar Glen trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                aria-label="Play the trailer"
                className="group absolute inset-0 block h-full w-full cursor-pointer"
              >
                <Image
                  src="/images/trailer-thumbnail.jpg"
                  alt="Trailer still: Briar Glen in a storm, Emma in the lit window, Chelsea outside. She's been waiting."
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-antique/90 shadow-lg transition group-hover:scale-105 group-hover:bg-antique md:h-20 md:w-20">
                  <Play className="h-7 w-7 translate-x-0.5 fill-charcoal text-charcoal md:h-8 md:w-8" />
                </span>
              </button>
            )}
          </div>
          <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.22em] text-aged/60">
            <span>Watch the Trailer</span>
            <span>Plays in page</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
