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
      {/* Stable anchor for #sample nav link */}
      <span id="sample" aria-hidden="true" className="absolute top-0" />
      {/* Stable anchor for #buy nav link */}
      <span id="buy" aria-hidden="true" className="absolute top-0" />
      {/* Full-width background image — artwork lives in the center zone */}
      <Image
        src="/images/Section%204%20Commerce%20section.png"
        alt="The First Resident of Briar Glen ebook cover"
        fill
        sizes="100vw"
        className="object-cover object-center scale-[1.02]"
      />
      {/* Subtle overall depth tint — left/right columns add their own solid bg */}
      <div className="absolute inset-0 bg-charcoal/20" />

      {/* Three-zone grid: [left text | center artwork | right text]
          minmax columns guarantee left/right never crowd the artwork */}
      <div
        className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-stretch md:grid-cols-[minmax(220px,1fr)_minmax(260px,380px)_minmax(220px,1fr)]"
        style={{ minHeight: "700px" }}
      >

        {/* LEFT ZONE: solid dark bg — structurally cannot overlap center */}
        <div className="flex items-center bg-charcoal/85 px-8 py-16 md:px-10 lg:px-14">
          <FadeIn className="flex w-full flex-col items-start md:items-center md:text-center">
            <div className="mb-4 text-antique">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-antique">Read the Opening Chapter</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold uppercase leading-[0.9] tracking-[0.04em] text-parchment md:text-5xl">
              Free
            </h2>
            <div className="my-5 h-px w-10 bg-antique/50" />
            <p className="text-sm leading-8 text-aged">
              Step inside Briar Glen.<br />
              Read the first chapter and<br />
              experience the mystery.
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
        </div>

        {/* CENTER ZONE: transparent — background artwork shows through fully */}
        <div className="hidden md:block" aria-hidden="true" />

        {/* RIGHT ZONE: solid dark bg — structurally cannot overlap center */}
        <div className="flex items-center bg-charcoal/85 px-8 py-16 md:px-10 lg:px-14">
          <FadeIn delay={0.15} className="flex w-full flex-col items-start md:items-center md:text-center">
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

      </div>
    </section>
  );
}
