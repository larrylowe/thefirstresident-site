import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";

const sampleUrl = "/samples/first-resident-sample.pdf";
const introPrice = process.env.NEXT_PUBLIC_INTRO_PRICE || "4.99";
const regularPrice = process.env.NEXT_PUBLIC_REGULAR_PRICE || "6.99";

export function CommerceSection() {
  return (
    <section
      id="commerce"
      className="relative overflow-hidden bg-charcoal"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* Full-width background image */}
      <Image
        src="/images/Section%204%20Commerce%20section.png"
        alt="The First Resident of Briar Glen — ebook cover with lantern and antique clock"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Dark overlay — lighter in center so cover shows through */}
      <div className="absolute inset-0 bg-charcoal/80 md:[mask-image:linear-gradient(to_right,_black_0%,_black_28%,_transparent_42%,_transparent_58%,_black_72%,_black_100%)]" />
      {/* Full-width gentle overlay for mobile readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/50 to-charcoal/60 md:hidden" />

      {/* Content grid */}
      <div className="relative z-10 mx-auto grid min-h-[740px] max-w-7xl grid-cols-1 items-center gap-8 px-6 py-20 md:grid-cols-3 md:gap-6 md:px-10 lg:px-16">

        {/* LEFT: Free Chapter */}
        <FadeIn className="flex flex-col items-start md:items-center md:text-center">
          <div className="mb-4 text-antique">
            {/* Book icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-antique">Read the Opening Chapter</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold uppercase leading-[0.9] tracking-[0.04em] text-parchment md:text-5xl">
            Free
          </h2>
          <div className="my-5 h-px w-10 bg-antique/50" />
          <p className="text-sm leading-8 text-aged md:text-base">
            Step inside Briar Glen.<br className="hidden md:block" />
            Read the first chapter and<br className="hidden md:block" />
            experience the mystery for yourself.
          </p>
          <div className="mt-8">
            <a
              href={sampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-antique/70 bg-antique/10 px-7 py-4 text-sm uppercase tracking-[0.2em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
            >
              Read Chapter One
            </a>
          </div>
        </FadeIn>

        {/* CENTER: transparent — shows background image (book cover) */}
        <div className="hidden md:block" aria-hidden="true" />

        {/* RIGHT: Buy Ebook */}
        <FadeIn delay={0.15} className="flex flex-col items-start md:items-center md:text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-antique">The Complete Ebook</p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-aged/70">Yours to Keep</p>
          <h2 className="mt-4 font-serif text-5xl font-semibold text-parchment md:text-6xl">
            ${introPrice}
          </h2>
          <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-antique">Launch Price</p>
          <div className="my-5 h-px w-10 bg-antique/50" />
          <p className="text-sm leading-7 text-aged">
            Price returns to ${regularPrice}<br />after launch.
          </p>
          <div className="mt-8">
            <BuyButton>Buy the Ebook</BuyButton>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
