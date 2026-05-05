import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";

export function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-charcoal" style={{ scrollMarginTop: "80px" }}>
      {/* Section 7 background image */}
      <Image
        src="/images/Section%207%20CTA.png"
        alt="You have been invited into Briar Glen"
        fill
        sizes="100vw"
        className="object-cover object-center scale-[1.02]"
      />
      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/50 to-charcoal/70" />
      <div className="absolute inset-0 bg-charcoal/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[480px]">
        <FadeIn>
          <h2 className="font-serif text-4xl font-semibold uppercase leading-[0.95] tracking-[0.06em] text-parchment sm:text-5xl md:text-6xl lg:text-7xl">
            You&rsquo;ve Been Invited<br />
            <span className="text-antique">into Briar Glen.</span>
          </h2>
          <p className="mt-4 font-serif text-xl italic text-aged md:text-2xl">
            RSVP here.
          </p>
          <div className="mx-auto my-7 flex items-center gap-4">
            <div className="h-px w-16 bg-antique/50" />
            <div className="h-1.5 w-1.5 rotate-45 bg-antique/70" />
            <div className="h-px w-16 bg-antique/50" />
          </div>
          <div className="flex justify-center">
            <BuyButton>Buy the Ebook</BuyButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
