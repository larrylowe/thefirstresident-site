import { FadeIn } from "./FadeIn";

export function WhyBuyDirect() {
  return (
    <section className="paper-texture bg-parchment py-20 text-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:grid-cols-[0.75fr_1fr] md:px-8">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.28em] text-tobacco">Why Buy Direct</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Support the work at the source</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-lg leading-8 text-ink/82">Marketplace platforms are useful for discovery, but direct purchase keeps more of the revenue with the creator and helps fund future books, visuals, trailers, and special editions.</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              "Direct support for the author",
              "Early path to special editions",
              "Cleaner future bundles and extras"
            ].map((item) => (
              <div key={item} className="border-l border-tobacco/50 pl-4 text-base leading-7 text-ink/80">{item}</div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
