import { FadeIn } from "./FadeIn";

export function AuthorSection() {
  return (
    <section id="author" className="section-anchor bg-charcoal py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 md:grid-cols-[0.8fr_1fr] md:px-8">
        <FadeIn>
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-antique">Author</p>
          <h2 className="font-serif text-4xl leading-tight text-parchment md:text-6xl">Larry Lowe</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-lg leading-8 text-aged">Larry Lowe is a strategist, writer, and creative director whose work spans storytelling, brand development, film, music, and cultural narrative. <em>The First Resident of Briar Glen</em> extends that creative practice into literary suspense, building a story world designed to live on the page and beyond it.</p>
          <a href="mailto:partn54digital@gmail.com" className="mt-8 inline-flex rounded-sm border border-antique px-7 py-4 text-sm uppercase tracking-[0.18em] text-parchment transition hover:bg-antique hover:text-charcoal">Contact</a>
        </FadeIn>
      </div>
    </section>
  );
}
