import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { FadeIn } from "./FadeIn";
import { product } from "@/data/product";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-charcoal pt-32">
      <div className="absolute inset-0 opacity-55">
        <Image src={product.houseImage} alt="Briar Glen Residence" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/82 to-charcoal/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-24 pt-10 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pt-24">
        <FadeIn>
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-antique">A Southern Gothic Suspense Novel</p>
          <h1 className="font-serif text-5xl font-semibold uppercase leading-[0.92] tracking-[0.08em] text-parchment md:text-7xl lg:text-8xl">
            The First<br />Resident<br />of Briar Glen
          </h1>
          <div className="my-8 h-px w-44 bg-antique/70" />
          <p className="max-w-xl font-serif text-2xl italic leading-snug text-antique md:text-3xl">{product.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-aged">
            In 1984, a family arrives at Briar Glen Residence, a quiet Southern home with a history older than anyone is willing to explain. Chelsea notices what the adults try not to see. A room that feels watched. A resident who was there first. A story that has been waiting for someone young enough to believe it.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
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
