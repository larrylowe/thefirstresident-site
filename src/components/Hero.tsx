import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";

const sampleUrl = "/samples/first-resident-sample.pdf";

export function Hero() {
  return (
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
      {/* Gradient overlays for left-side text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/35" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-28 pb-20 md:px-14 lg:px-20">
        <FadeIn className="max-w-lg lg:max-w-2xl">
          <h1 className="font-serif text-4xl font-semibold uppercase leading-[0.9] tracking-[0.05em] text-parchment sm:text-5xl md:text-6xl lg:text-7xl">
            Every house has<br />a first resident.<br />
            <span className="text-antique">This one never left.</span>
          </h1>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px w-12 bg-antique/60" />
            <div className="h-1 w-1 rotate-45 bg-antique/70" />
            <div className="h-px w-12 bg-antique/60" />
          </div>

          <p className="text-base leading-8 text-aged md:text-[17px]">
            Step into the shadowed past of Briar Glen,<br className="hidden sm:block" />
            where history whispers and something<br className="hidden sm:block" />
            still waits behind the door.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={sampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-antique/80 px-7 py-4 text-center text-sm uppercase tracking-[0.18em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
            >
              Read Chapter One
            </a>
            <BuyButton>Buy the Ebook</BuyButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
