import Image from "next/image";
import { FadeIn } from "./FadeIn";

export function ChelseaSection() {
  return (
    <section id="story" className="relative overflow-hidden bg-charcoal" style={{ scrollMarginTop: "80px" }}>
      {/* Stable anchors for older #chelsea and #mystery links */}
      <span id="chelsea" aria-hidden="true" className="absolute top-0" />
      <span id="mystery" aria-hidden="true" className="absolute top-0" />
      <div className="grid grid-cols-1 md:grid-cols-[50fr_50fr]">
        {/* Image column — anchored on Chelsea */}
        <div className="relative h-[320px] sm:h-[420px] md:h-auto md:min-h-[620px]">
          <Image
            src="/images/Section%202%20Chelsea.png"
            alt="Chelsea Parker, nine years old, arriving at Briar Glen"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[30%_50%]"
          />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-charcoal md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal md:hidden" />
        </div>

        {/* Text column */}
        <div className="flex items-center px-5 pb-16 pt-4 sm:px-8 md:px-12 md:py-20 lg:px-16">
          <FadeIn delay={0.1} className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-antique">
              Virginia · Spring 1984
            </p>
            <h2 className="mt-5 font-serif text-[32px] font-normal leading-[1.12] text-parchment sm:text-4xl lg:text-[46px]">
              A little girl. A grandmother she adores. A house with a history no one speaks of.
            </h2>
            <div className="my-7 h-px w-10 bg-antique/40" />
            <div className="space-y-5 font-serif text-xl leading-relaxed text-aged">
              <p>
                On Saturdays, Chelsea Parker visits her grandmother, Nana Charlotte Parker,
                at Briar Glen Residence: a residence for the elderly, housed in a former
                private residence in Virginia. There are rockers on the side porch,
                crossword books, bingo, and gossip traded over cold coffee. The residents
                call her sugar.
              </p>
              <p>
                When Nana Charlotte is hurt while no one is watching, the grown folks reach
                for ordinary explanations. Chelsea has stopped believing them.
              </p>
            </div>
            <a
              href="#prelude"
              className="mt-8 inline-block text-xs font-medium uppercase tracking-[0.22em] text-antique transition hover:text-parchment"
            >
              Read the Prelude free →
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
