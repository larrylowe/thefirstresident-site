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
      {/* Gradient overlays — strong left coverage for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/97 via-charcoal/75 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/35" />

      {/* Hero content — single column, left-aligned */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-28 pb-20 md:px-14 lg:px-20">
        <FadeIn className="max-w-xl">

          {/* Headline */}
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

          {/* Two CTAs stacked beneath copy */}
          <div className="mt-10 flex max-w-[280px] flex-col gap-[10px]">

            {/* 1. READ CHAPTER ONE — primary, antique gold */}
            <a
              href={sampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center bg-antique px-6 py-[14px] text-center text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal transition hover:bg-aged"
            >
              Read Chapter One
            </a>

            {/* 2. BUY THE EBOOK — Stripe checkout via BuyButton */}
            <div className="w-full [&>div]:w-full [&_button]:w-full [&_button]:rounded-none [&_button]:py-[14px] [&_button]:text-[11px] [&_button]:tracking-[0.22em]">
              <BuyButton>Buy the Ebook</BuyButton>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
