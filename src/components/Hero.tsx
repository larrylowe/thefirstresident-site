import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";
import { product } from "@/data/product";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-charcoal pt-24">
      <div className="absolute inset-0 opacity-55">
        <Image src={product.houseImage} alt="Briar Glen Residence" fill priority sizes="100vw" className="object-cover brightness-[1.2]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/82 to-charcoal/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-24 pt-6 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pt-14">
        <FadeIn>
          {/*
            Replace the generic genre label with a more evocative category line.
            The brief calls for "A Novel of Ancestral Memory and Family Reckoning"
            as the public-facing descriptor rather than "Southern Gothic" so as
            not to narrow the audience.  Keep the uppercase styling intact.
          */}
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-antique">
            A Novel of Horror, Dark History, and Family Reckoning
          </p>
          <h1 className="font-serif text-5xl font-semibold uppercase leading-[0.92] tracking-[0.08em] text-parchment md:text-7xl lg:text-8xl">
            The First<br />Resident<br />of Briar Glen
          </h1>
          <div className="my-8 h-px w-44 bg-antique/70" />
          <p className="max-w-xl font-serif text-2xl italic leading-snug text-antique md:text-3xl">{product.tagline}</p>
          {/*
            Update the hero body copy to preserve mystery and align with the
            refined marketing language.  Avoid direct plot spoilers and frame
            the house as a place where the past remains present.  This body
            copy should reinforce the tagline without repeating it.
          */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-aged">
            Many residents have called Briar Glen home. None as dangerous as its first.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-aged">
            What waits inside has been ignored, dismissed, and mistaken for something harmless enough to leave alone. Chelsea Parker knows better.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#sample" className="rounded-sm bg-antique px-7 py-4 text-center text-sm uppercase tracking-[0.18em] text-charcoal transition hover:bg-parchment">
              Get the Free Sample
            </a>
            <BuyButton />
            <a href="#watch" className="rounded-sm border border-antique/70 px-7 py-4 text-center text-sm uppercase tracking-[0.18em] text-parchment transition hover:bg-parchment hover:text-charcoal">
              Watch Synopsis
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
