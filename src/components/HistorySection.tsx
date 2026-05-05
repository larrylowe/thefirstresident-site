import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";

export function HistorySection() {
  return (
    <section id="history" className="overflow-hidden bg-charcoal" style={{ scrollMarginTop: "80px" }}>
      <div className="grid grid-cols-1 md:grid-cols-[50fr_50fr]">
        {/* Image column — left */}
        <div className="relative h-[340px] md:h-auto md:min-h-[640px]">
          <Image
            src="/images/Section%205%20History.png"
            alt="Antique objects and artifacts from the history of Briar Glen — real and supernatural"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {/* Desktop blend to text column */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-charcoal/85 md:block" />
          {/* Mobile fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal md:hidden" />
        </div>

        {/* Text column — right */}
        <div className="flex items-center bg-charcoal px-8 py-14 md:px-12 lg:px-16 xl:px-20">
          <FadeIn delay={0.1} className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.3em] text-antique">
              Uncover the Past
            </p>
            <div className="my-4 flex items-center gap-3">
              <div className="h-px w-8 bg-antique/50" />
              <div className="h-1 w-1 rotate-45 bg-antique/60" />
              <div className="h-px w-8 bg-antique/50" />
            </div>
            <h2 className="font-serif text-3xl font-semibold uppercase leading-[1.0] tracking-[0.04em] text-parchment md:text-4xl lg:text-5xl">
              History of Horrors:<br />Real and<br />Supernatural
            </h2>
            <div className="my-6 h-px w-10 bg-antique/40" />
            <p className="text-sm leading-8 text-aged md:text-base">
              Briar Glen&rsquo;s story is woven from both sides of the veil&mdash;
              true historical tragedies and hauntings that defy explanation.
              Understand the legacy. Feel the weight of what remains.
            </p>
            {/* EXPLORE THE HISTORY routes to Stripe checkout — the deeper history is part of the paid experience */}
            <div className="mt-8">
              <BuyButton>Explore the History</BuyButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
