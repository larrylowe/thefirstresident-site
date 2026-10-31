import Image from "next/image";
import { FadeIn } from "./FadeIn";

const sampleUrl = "/samples/PRELUDE%20-%20The%20First%20Resident%20of%20Briar%20Glen%20Ebook.pdf";
const sampleEpubUrl = "/samples/PRELUDE%20-%20The%20First%20Resident%20of%20Briar%20Glen%20Ebook.epub";

/** Free Prelude: read online, or download the PDF or EPUB. */
export function PreludeSection() {
  return (
    <section id="prelude" className="relative overflow-hidden bg-[#e8dcc2] text-ink" style={{ scrollMarginTop: "80px" }}>
      {/* Stable anchor for older #sample links */}
      <span id="sample" aria-hidden="true" className="absolute top-0" />
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[minmax(200px,300px)_minmax(0,1fr)] md:gap-14 md:px-12 md:py-24 lg:px-16 xl:grid-cols-[300px_minmax(0,1fr)_minmax(260px,330px)]">
        <FadeIn className="mx-auto w-[220px] sm:w-[260px] md:w-full">
          <div className="relative aspect-[2/3] shadow-[0_24px_50px_rgba(33,27,22,0.45)]">
            <Image
              src="/images/prelude-woman-in-the-chair.png"
              alt="Chelsea stands frozen inside Briar Glen, the dropped pie at her feet, facing Emma seated in her chair."
              fill
              sizes="(max-width: 768px) 260px, 300px"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="text-center md:text-left">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-tobacco">
            Read Free · The Opening of the Novel
          </p>
          <h2 className="mt-4 font-serif text-5xl font-normal uppercase tracking-[0.06em] md:text-6xl">
            Prelude
          </h2>
          <p className="mt-2 font-serif text-3xl italic text-ink/85">The Woman in the Chair</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-ink/60">Virginia, Spring 1984</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:flex-col md:items-start">
            <a
              href={sampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center whitespace-nowrap bg-ink px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-parchment transition hover:bg-charcoal sm:w-auto md:w-64"
            >
              Read Online
            </a>
            <a
              href={sampleUrl}
              download
              className="inline-flex w-full items-center justify-center whitespace-nowrap border border-ink/60 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-parchment sm:w-auto md:w-64"
            >
              Download PDF
            </a>
            <a
              href={sampleEpubUrl}
              download
              className="inline-flex w-full items-center justify-center whitespace-nowrap border border-ink/60 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-parchment sm:w-auto md:w-64"
            >
              Download EPUB
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="md:col-span-2 xl:col-span-1">
          <figure className="mx-auto max-w-sm bg-[#f6efe2] px-8 py-9 shadow-[0_18px_40px_rgba(33,27,22,0.18)]">
            <blockquote className="space-y-2 font-serif text-[21px] leading-snug text-ink">
              <p>Then she saw her.</p>
              <p>Emma sat in the armchair across the room.</p>
              <p>Not in the common room.</p>
              <p>Not down the hall.</p>
              <p>In here.</p>
            </blockquote>
            <figcaption className="mt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-tobacco">
              From the Prelude
            </figcaption>
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}
