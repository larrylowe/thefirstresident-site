import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { product } from "@/data/product";

export function StorySection() {
  return (
    <section id="story" className="section-anchor paper-texture bg-parchment pt-4 pb-24 text-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-5 md:grid-cols-[1fr_0.85fr] md:px-8">
        <FadeIn>
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-tobacco">The Story</p>
          <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            A Place. A Presence. A Past That Refuses to Stay Buried.
          </h2>
          <div className="my-7 h-px w-32 bg-tobacco/70" />
          <div className="max-w-2xl space-y-5 text-lg leading-8 text-ink/82">
            <p>
              In 1984, nine-year-old Chelsea Parker visits her grandmother at
              Briar Glen, a quiet Virginia residence for the elderly. But an
              unsettling resident keeps appearing where she should not be, and
              Chelsea sees what others are determined to overlook.
            </p>
            <p>
              As strange accidents happen and a dark history begins to surface,
              Chelsea and her family uncover a past that something has worked
              hard to keep hidden, with truths that now threaten their lives.
            </p>
            <p>
              Some secrets are hidden for a reason. Some refuse to stay in the dark.
            </p>
          </div>

          {/* Charlotte image + editorial copy — side by side under story body */}
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="shrink-0 overflow-hidden rounded-sm shadow-xl md:w-[340px]">
              <div className="relative h-64 w-full md:h-[280px]">
                <Image
                  src={product.charlotteImage}
                  alt="Little Charlotte facing the original residence of Briar Glen"
                  fill
                  sizes="(max-width: 768px) 80vw, 340px"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-tobacco">
                Digital edition by {product.author}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-tobacco">Perfect for fans of</p>
              <ul className="mt-3 space-y-2 text-sm italic leading-6 text-ink/80">
                <li>Character-driven horror</li>
                <li>Family secrets</li>
                <li>Supernatural suspense</li>
                <li>Unsettling childhood fear</li>
                <li>Atmospheric page-turners</li>
              </ul>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="relative mx-auto w-full max-w-sm">
          {/* Book mockup — borderless, clean */}
          <div className="relative aspect-[2/3]">
            <Image
              src={product.coverImage}
              alt="Book cover for The First Resident of Briar Glen by Larry Lowe"
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
