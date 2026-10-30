import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { CheckoutNotice } from "./CheckoutNotice";
import { FadeIn } from "./FadeIn";

const includes = [
  "The complete novel: Prelude and twenty chapters",
  "Instant download",
  "Access to the Whitmore Investigation archive",
];

export function CommerceSection({ price }: { price: string }) {
  return (
    <section
      id="buy"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_25%_40%,#2a1f14_0%,#151512_60%)]"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* Stable anchor for older #commerce links */}
      <span id="commerce" aria-hidden="true" className="absolute top-0" />
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[minmax(220px,360px)_minmax(0,1fr)] md:gap-16 md:px-12 md:py-24 lg:px-16">
        <FadeIn className="mx-auto w-[220px] sm:w-[280px] md:w-full">
          <div className="relative aspect-[2/3] border border-antique/30 shadow-[0_30px_70px_rgba(0,0,0,0.75)]">
            <Image
              src="/images/book-cover-approved.jpg"
              alt="The First Resident of Briar Glen book cover"
              fill
              sizes="(max-width: 768px) 280px, 360px"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="text-center md:text-left">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-antique">The Complete Ebook</p>
          <h2 className="mt-5 font-serif text-4xl font-normal leading-tight text-parchment md:text-5xl">
            Finish what Chelsea started.
          </h2>
          <p className="mt-6 font-serif text-6xl leading-none text-parchment md:text-7xl">${price}</p>
          <ul className="mx-auto mt-8 max-w-md space-y-3 text-left md:mx-0">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-3 font-serif text-xl text-aged">
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-antique" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row md:items-center">
            <BuyButton className="w-full px-9 text-sm sm:w-auto">Buy the Ebook</BuyButton>
            <span className="text-xs text-aged/70">Secure checkout by Stripe</span>
          </div>
          <CheckoutNotice />
        </FadeIn>
      </div>
    </section>
  );
}
