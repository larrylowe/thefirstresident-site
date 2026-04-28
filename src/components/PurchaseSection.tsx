import { BuyButton } from "./BuyButton";
import { product } from "@/data/product";
import { FadeIn } from "./FadeIn";

export function PurchaseSection() {
  return (
    <section id="buy" className="section-anchor bg-moss py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 md:grid-cols-[1fr_0.85fr] md:px-8">
        <FadeIn>
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-antique">Buy Direct</p>
          <h2 className="font-serif text-4xl leading-tight text-parchment md:text-6xl">
            Open the door to Briar Glen.
          </h2>
          <p className="mt-6 text-lg leading-8 text-aged">
            Continue past the first visit and follow Chelsea deeper into Briar Glen, where what has been waiting is no longer content to remain unseen. After purchase, the full digital edition is available immediately for download and reading.
          </p>
          <p className="mt-5 font-serif text-xl italic text-antique">
            The first resident is still here.
          </p>
        </FadeIn>
        <FadeIn delay={0.15} className="rounded-sm border border-antique/25 bg-charcoal/70 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-antique">Digital Edition</p>
          <h3 className="mt-4 font-serif text-4xl text-parchment">{product.title}</h3>
          <p className="mt-2 text-aged">By {product.author}</p>
          <div className="my-6 h-px bg-antique/20" />
          <p className="text-5xl font-serif text-parchment">${product.price}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.15em] text-aged">
            Introductory price
          </p>
          <p className="text-xs text-aged/80">
            Price increases to ${product.regularPrice} after the launch period.
          </p>
          <ul className="mt-6 space-y-3 text-aged">
            <li>Instant digital book file</li>
            <li>Secure one-time payment</li>
            <li>PDF edition (EPUB may follow later)</li>
          </ul>
          <div className="mt-8">
            <BuyButton>Buy the Ebook – ${product.price}</BuyButton>
          </div>
          <p className="mt-5 text-xs leading-5 text-aged/75">
            Digital purchase terms: all sales are final once the file has been
            delivered or accessed. If you have trouble opening or receiving
            your file, contact support and we will help resolve the issue.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
