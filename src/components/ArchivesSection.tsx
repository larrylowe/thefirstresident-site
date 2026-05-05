import Image from "next/image";
import { FadeIn } from "./FadeIn";

export function ArchivesSection() {
  return (
    <section id="archives" className="overflow-hidden bg-ink" style={{ scrollMarginTop: "80px" }}>
      <div className="grid grid-cols-1 md:grid-cols-[50fr_50fr]">
        {/* Image column — left */}
        <div className="relative h-[340px] md:h-auto md:min-h-[640px]">
          <Image
            src="/images/Section%206%20Archives.png"
            alt="Investigative archives — newspapers, records, and witness accounts from Briar Glen"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {/* Desktop blend */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-ink/85 md:block" />
          {/* Mobile fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink md:hidden" />
        </div>

        {/* Text column — right */}
        <div className="flex items-center bg-ink px-8 py-14 md:px-12 lg:px-16 xl:px-20">
          <FadeIn delay={0.1} className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.3em] text-antique">
              The Truth Is in the Records
            </p>
            <div className="my-4 flex items-center gap-3">
              <div className="h-px w-8 bg-antique/50" />
              <div className="h-1 w-1 rotate-45 bg-antique/60" />
              <div className="h-px w-8 bg-antique/50" />
            </div>
            <h2 className="font-serif text-3xl font-semibold uppercase leading-[1.0] tracking-[0.04em] text-parchment md:text-4xl lg:text-5xl">
              Investigative<br />Archives
            </h2>
            <div className="my-6 h-px w-10 bg-antique/40" />
            <p className="text-sm leading-8 text-aged md:text-base">
              Newspapers. Records. Witness accounts.<br className="hidden md:block" />
              Explore the evidence behind the legend<br className="hidden md:block" />
              and the questions that remain.
            </p>
            {/* Routes to /archive — a protected archive experience */}
            <div className="mt-8">
              <a
                href="/archive"
                className="inline-block border border-antique/70 px-7 py-4 text-sm uppercase tracking-[0.2em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
              >
                Explore the Archives
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
