import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";

/**
 * Closing invitation. The original Section 7 artwork is split into its photo
 * strips, parchment and ornaments (public/images/invitation) so the ornaments
 * sit in their own rows and can never overlap the headline or button.
 */
export function CTASection({ price }: { price: string }) {
  return (
    <section id="cta" className="relative overflow-hidden bg-charcoal" style={{ scrollMarginTop: "80px" }}>
      {/* Stable anchor for #stay-close nav link */}
      <span id="stay-close" aria-hidden="true" className="absolute top-0" />

      <div
        aria-hidden="true"
        className="h-16 bg-cover bg-center sm:h-24 md:h-28"
        style={{ backgroundImage: "url('/images/invitation/top-strip.jpg')" }}
      />

      <div
        className="bg-cover bg-center px-5 py-7 sm:px-10 md:px-16 md:py-9"
        style={{ backgroundImage: "url('/images/invitation/parchment.jpg')" }}
      >
        <FadeIn className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/invitation/ornament-top.png" alt="" aria-hidden="true" className="h-auto w-[200px] max-w-full sm:w-[260px]" />

          <h2 className="mt-6 max-w-full break-words font-serif text-[clamp(2rem,1.1rem+3.6vw,4.25rem)] font-medium leading-[1.08] text-[#24170c] [text-wrap:balance] md:mt-7">
            You&rsquo;ve been invited into Briar Glen.
          </h2>

          <div className="mt-8 md:mt-9">
            <BuyButton variant="dark" className="px-6 text-xs sm:px-9 sm:text-sm">
              Accept the Invitation · ${price}
            </BuyButton>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/invitation/ornament-bottom.png" alt="" aria-hidden="true" className="mt-8 h-auto w-[200px] max-w-full sm:w-[280px] md:mt-10" />
        </FadeIn>
      </div>

      <div
        aria-hidden="true"
        className="h-8 bg-cover bg-center md:h-11"
        style={{ backgroundImage: "url('/images/invitation/bottom-strip.jpg')" }}
      />
    </section>
  );
}
