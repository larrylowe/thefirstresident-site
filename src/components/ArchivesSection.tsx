import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";

/** Archive: the purchase-exclusive Whitmore Investigation. Content stays behind /archive's access check. */
export function ArchivesSection() {
  return (
    <article id="archives" className="relative flex flex-col" style={{ scrollMarginTop: "80px" }}>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src="/images/archive-door-entry.png"
          alt="The locked door of the Briar Glen Archives, with a caution sign"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0b09]/70" />
        <span className="absolute right-4 top-4 border border-antique/70 bg-charcoal/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-parchment">
          Included with Purchase
        </span>
      </div>
      <FadeIn delay={0.1} className="flex flex-1 flex-col px-5 py-10 sm:px-8 md:px-10 md:py-12 lg:px-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-antique">The Archive · For Readers</p>
        <h2 className="mt-5 font-serif text-[32px] font-normal leading-[1.12] text-parchment lg:text-[40px]">
          The Whitmore Investigation
        </h2>
        <p className="mt-5 font-serif text-xl leading-relaxed text-aged">
          Some records were never meant to be filed. Newspapers. Records. Witness
          accounts. Unlocked with the ebook, and best opened after you finish it.
        </p>
        <p className="mt-4 text-sm leading-6 text-aged/75">
          Every ebook purchase includes access. After checkout you go straight into the
          archive, and you can restore access later with your checkout email.
        </p>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.22em] text-aged/55">Contains spoilers</p>
        <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center">
          <BuyButton className="px-6 text-xs">Buy the Ebook to Enter</BuyButton>
          <a
            href="/archive"
            className="text-[11px] font-medium uppercase tracking-[0.18em] text-aged transition hover:text-antique"
          >
            Already purchased? Restore access
          </a>
        </div>
      </FadeIn>
    </article>
  );
}
