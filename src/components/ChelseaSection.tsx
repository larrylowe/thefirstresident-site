import Image from "next/image";
import { FadeIn } from "./FadeIn";

export function ChelseaSection() {
  return (
    <section id="chelsea" className="overflow-hidden bg-charcoal" style={{ scrollMarginTop: "80px" }}>
      <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr]">
        {/* Image column */}
        <div className="relative h-[340px] md:h-auto md:min-h-[640px]">
          <Image
            src="/images/Section%202%20Chelsea.png"
            alt="A young girl carries a warm pie toward Briar Glen — the mystery begins here"
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-center"
          />
          {/* Blend edge into text column on desktop */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-charcoal/80 md:block" />
          {/* Fade bottom on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal md:hidden" />
        </div>

        {/* Text column */}
        <div className="flex items-center bg-charcoal px-8 py-14 md:px-12 lg:px-16 xl:px-20">
          <FadeIn delay={0.1} className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.3em] text-antique">
              The Story Begins Here
            </p>
            <div className="my-4 flex items-center gap-3">
              <div className="h-px w-8 bg-antique/50" />
              <div className="h-1 w-1 rotate-45 bg-antique/60" />
              <div className="h-px w-8 bg-antique/50" />
            </div>
            <h2 className="font-serif text-3xl font-semibold uppercase leading-[1.0] tracking-[0.04em] text-parchment md:text-4xl lg:text-5xl">
              A Mystery Rooted<br />in Place —<br />and in Time.
            </h2>
            <div className="my-6 h-px w-10 bg-antique/40" />
            <p className="text-sm leading-8 text-aged md:text-base">
              A little girl. A warm pie. A house with a history
              no one speaks of. What began as a simple act
              of kindness became a legend that never died.
            </p>
            {/* No button in Section 2 per brief */}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
