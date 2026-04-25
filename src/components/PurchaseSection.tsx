import { BuyButton } from "./BuyButton";
import { product } from "@/data/product";
import { FadeIn } from "./FadeIn";

export function PurchaseSection() {
  return (
    <section id="buy" className="section-anchor bg-moss py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 md:grid-cols-[1fr_0.85fr] md:px-8">
        <FadeIn>
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-antique">Buy Direct</p>
          <h2 className="font-serif text-4xl leading-tight text-parchment md:text-6xl">Own the digital edition</h2>
          <p className="mt-6 text-lg leading-8 text-aged">Purchase the full digital edition directly from the official site. After payment, you will receive access to the complete book file according to the fulfillment method selected for launch.</p>
        </FadeIn>
        <FadeIn delay={0.15} className="rounded-sm border border-antique/25 bg-charcoal/70 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-antique">Digital Edition</p>
          <h3 className="mt-4 font-serif text-4xl text-parchment">{product.title}</h3>
          <p className="mt-2 text-aged">By {product.author}</p>
          <div className="my-6 h-px bg-antique/20" />
          <p className="text-5xl font-serif text-parchment">${product.price}</p>
          <ul className="mt-6 space-y-3 text-aged">
            <li>Full digital book file</li>
            <li>Secure one-time payment</li>
            <li>Immediate post-purchase confirmation</li>
            <li>PDF edition, with EPUB possible later</li>
          </ul>
          <div className="mt-8"><BuyButton>Buy Now</BuyButton></div>
          <p className="mt-5 text-sm leading-6 text-aged/75">Price and delivery rules can be changed before launch. Stripe test mode should be used first.</p>
        </FadeIn>
      </div>
    </section>
  );
}
