import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { product } from "@/data/product";

export function StorySection() {
  return (
    <section id="story" className="section-anchor paper-texture bg-parchment py-24 text-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 md:grid-cols-[1fr_0.85fr] md:px-8">
        <FadeIn>
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-tobacco">The Story</p>
          {/*
            Replace the story headline with one that reflects the revised
            positioning.  Keep the elegant, literary phrasing and punctuate
            each phrase with a period to build rhythm.
          */}
          <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            A respectable residence. A buried past. A family truth
            waiting beneath the floorboards.
          </h2>
          <div className="my-7 h-px w-32 bg-tobacco/70" />
          {/*
            Update the story section body to follow the brief: introduce
            Chelsea's family, the mysterious fall, the mother's investigation,
            and the suggestion that the house's past is entwined with their own.
            Preserve the spacing and typographic styling.
          */}
          <div className="max-w-2xl space-y-5 text-lg leading-8 text-ink/82">
            <p>
              When Nana Charlotte suffers a mysterious fall at Briar Glen,
              Chelsea’s mother Ellen begins looking more closely at the old
              residence and the strange figure everyone seems too willing to
              explain away.
            </p>
            <p>
              What now passes as a genteel care home once served another
              purpose, under another name, in an era no one at Briar Glen seems
              eager to discuss. The deeper Ellen looks, the clearer it becomes
              that the house’s past is not merely local history. It is family
              history.
            </p>
            <p>
              As old records surface and present-day danger closes in, three
              generations of women must face what the house has kept hidden
              before Briar Glen claims one of them too.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15} className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[2/3] overflow-hidden rounded-sm border border-tobacco/30 bg-charcoal shadow-2xl">
            <Image src={product.coverImage} alt="Book cover for The First Resident of Briar Glen by Larry Lowe" fill sizes="(max-width: 768px) 80vw, 360px" className="object-cover" />
          </div>
          <p className="mt-5 text-center text-sm uppercase tracking-[0.18em] text-tobacco">Digital edition by Larry Lowe</p>
        </FadeIn>
      </div>
    </section>
  );
}
