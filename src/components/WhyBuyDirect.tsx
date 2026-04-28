import { FadeIn } from "./FadeIn";

export function WhyBuyDirect() {
  return (
    <section className="paper-texture bg-parchment py-20 text-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:grid-cols-[0.75fr_1fr] md:px-8">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.28em] text-tobacco">Why Buy Direct</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Why buy direct?</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-lg leading-8 text-ink/82">Buying direct gives you immediate access to the digital edition through a secure one-time checkout, without needing a marketplace account. It also helps keep launch pricing reasonable while making room for future special editions, bundles, and related releases.</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              "Immediate digital access",
              "Secure one-time checkout",
              "Reasonable launch pricing",
              "Future editions and extras"
            ].map((item) => (
              <div key={item} className="border-l border-tobacco/50 pl-4 text-base leading-7 text-ink/80">{item}</div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
