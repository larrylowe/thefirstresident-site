import { FileDown } from "lucide-react";
import { product } from "@/data/product";
import { FadeIn } from "./FadeIn";

export function SampleSection() {
  return (
    <section id="sample" className="section-anchor paper-texture bg-aged py-24 text-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:grid-cols-[0.8fr_1fr] md:px-8">
        <FadeIn>
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-tobacco">Read</p>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">Visit Briar Glen with Chelsea</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mb-5 font-serif text-xl italic text-tobacco">Before you buy the book, enter the house for free.</p>
          <p className="text-lg leading-8 text-ink/82">Until now, Briar Glen has been a quiet place for a visit, a story, and a few hours beside Nana Charlotte. Chelsea soon understands that one resident has been quietly waiting for her family to return.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={product.sampleUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-sm bg-charcoal px-7 py-4 text-sm uppercase tracking-[0.18em] text-parchment transition hover:bg-ink">
              <FileDown className="h-5 w-5" /> Get the Free Sample
            </a>
            <a href="#buy" className="inline-flex items-center justify-center rounded-sm border border-tobacco px-7 py-4 text-sm uppercase tracking-[0.18em] text-ink transition hover:bg-tobacco hover:text-parchment">
              Get the Full Story
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
