import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { product } from "@/data/product";

export function StorySection() {
  return (
    <section id="story" className="section-anchor paper-texture bg-parchment pt-12 pb-24 text-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 md:grid-cols-[1fr_0.85fr] md:px-8">
        <FadeIn>
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-tobacco">The Story</p>
          {/*
            Replace the story headline with one that reflects the revised
            positioning.  Keep the elegant, literary phrasing and punctuate
            each phrase with a period to build rhythm.
          */}
          <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            A House. A Secret. A Little&nbsp;Girl&nbsp;Who&nbsp;Remembers.
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
              In 1984, nine‑year‑old Chelsea Parker visits her grandmother at
              Briar&nbsp;Glen, a quiet Virginia residence for the elderly. But
              an unsettling resident named Emma keeps appearing where she should
              not be, and Chelsea sees what others are determined to overlook.
            </p>
            <p>
              As strange accidents happen and old records surface, Chelsea’s
              mother begins to uncover a past the house has worked hard to keep
              hidden—truths that reach far beyond their family.
            </p>
            <p>
              Some places were built to be forgotten. Some spirits were never
              meant to leave.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15} className="relative mx-auto w-full max-w-sm">
          {/* Book mockup without a border for a cleaner presentation */}
          <div className="relative aspect-[2/3]">
            <Image
              src={product.coverImage}
              alt="Book cover for The First Resident of Briar Glen by Larry Lowe"
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              className="object-cover"
            />
          </div>
          <p className="mt-5 text-center text-sm uppercase tracking-[0.18em] text-tobacco">
            Digital edition by {product.author}
          </p>
          {/* Fans and genres list to orient readers */}
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-tobacco">Perfect for fans&nbsp;of</p>
          <ul className="mt-3 space-y-2 text-sm italic leading-6 text-ink/80">
            <li>Haunting family sagas</li>
            <li>Historical suspense</li>
            <li>Stories of hidden pasts</li>
            <li>Supernatural fiction</li>
            <li>Atmospheric page‑turners</li>
          </ul>
          {/* Little Charlotte image to anchor the historical narrative visually */}
          <div className="mt-10 relative w-full overflow-hidden rounded-sm shadow-2xl">
            <div className="relative h-60 w-full">
              <Image
                src={product.charlotteImage}
                alt="Little Charlotte facing the original residence of Briar Glen"
                fill
                sizes="(max-width: 768px) 80vw, 360px"
                className="object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
