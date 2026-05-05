"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { FadeIn } from "./FadeIn";

const EMBED_URL = "https://www.youtube.com/embed/pOdHt66Bue4";

export function VideoSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="video" className="overflow-hidden bg-ink" style={{ scrollMarginTop: "80px" }}>
      <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr]">

        {/* Image / embed column */}
        <div className="group relative h-[340px] md:h-auto md:min-h-[640px] overflow-hidden">
          {showVideo ? (
            /* Inline YouTube nocookie embed */
            <div className="relative h-full w-full bg-charcoal">
              <iframe
                src={`${EMBED_URL}?autoplay=1&rel=0&modestbranding=1`}
                title="The First Resident of Briar Glen — Video Synopsis"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
              {/* Close button */}
              <button
                onClick={() => setShowVideo(false)}
                aria-label="Close video"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-charcoal/80 text-parchment transition hover:bg-charcoal hover:text-antique"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            /* Thumbnail with play button — click to reveal embed */
            <button
              onClick={() => setShowVideo(true)}
              aria-label="Play the video synopsis inside the page"
              className="group relative block h-full w-full cursor-pointer"
            >
              <Image
                src="/images/Section%203%20laptop%20and%20wine.png"
                alt="A cinematic still — a laptop screen glowing in a candlelit room beside a glass of wine"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
              />
              {/* Desktop blend */}
              <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-ink/80 md:block" />
              {/* Mobile fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink md:hidden" />
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center border border-antique/60 bg-charcoal/60 transition duration-300 group-hover:border-antique group-hover:bg-charcoal/80">
                  <Play className="h-7 w-7 fill-antique text-antique translate-x-0.5" />
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Text column */}
        <div className="flex items-center bg-ink px-8 py-14 md:px-12 lg:px-16 xl:px-20">
          <FadeIn delay={0.1} className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.3em] text-antique">
              Step Inside the Story
            </p>
            <div className="my-4 flex items-center gap-3">
              <div className="h-px w-8 bg-antique/50" />
              <div className="h-1 w-1 rotate-45 bg-antique/60" />
              <div className="h-px w-8 bg-antique/50" />
            </div>
            <h2 className="font-serif text-3xl font-semibold uppercase leading-[1.0] tracking-[0.04em] text-parchment md:text-4xl lg:text-5xl">
              Watch the<br />Video Synopsis
            </h2>
            <div className="my-6 h-px w-10 bg-antique/40" />
            <p className="text-sm leading-8 text-aged md:text-base">
              Experience the world of Briar Glen in a cinematic
              synopsis. Before you read, watch the story
              come to life.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setShowVideo(true)}
                className="inline-flex items-center gap-3 border border-antique/70 px-7 py-4 text-sm uppercase tracking-[0.2em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch the Synopsis
              </button>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
