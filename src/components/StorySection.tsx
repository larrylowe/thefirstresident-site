import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { product } from "@/data/product";

export function StorySection() {
  return (
    <section id="story" className="section-anchor paper-texture bg-parchment py-24 text-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 md:grid-cols-[1fr_0.85fr] md:px-8">
        <FadeIn>
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-tobacco">The Story</p>
          <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">A home built on memory. A child who sees too much. A resident who was there first.</h2>
          <div className="my-7 h-px w-32 bg-tobacco/70" />
          <div className="max-w-2xl space-y-5 text-lg leading-8 text-ink/82">
            <p>Briar Glen Residence was never meant to feel like an institution. It was a home, or close enough to one, with warm rooms, worn floors, old routines, and stories folded into the walls.</p>
            <p>Chelsea arrives with the ordinary fears of a child entering an unfamiliar place. What she finds is stranger than fear. Emma is always there, still and silent, a presence the adults explain too quickly and avoid too carefully.</p>
            <p>As the past begins to surface, Briar Glen becomes less a place of care than a house of unfinished business.</p>
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
