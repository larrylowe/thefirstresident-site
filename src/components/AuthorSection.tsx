import Image from "next/image";
import { FadeIn } from "./FadeIn";

// Larry Lowe's approved author's note — reproduce in full, unedited.
const note = [
  "I’ve always had a pretty wild imagination, and I’ve never needed much encouragement to let it wander into places it probably shouldn’t.",
  "The First Resident of Briar Glen came from that imagination, but also from something much more serious. I’ve long been fascinated by the darker parts of our history, especially the things people would rather forget. Some of those things haven’t disappeared. They’ve simply found different ways of showing up. Our history contains enough real horror as it is.",
  "Somewhere along the way, those thoughts became a story about a little girl, her grandmother, an old house in Virginia, and a rather peculiar lady named Emma who has a habit of turning up where she isn’t expected. As Chelsea discovers, some things from the past refuse to stay there.",
  "I had a wonderful time creating these characters and deciding just how much trouble they were going to find themselves in. Now it’s your turn to step inside Briar Glen and discover what has been hiding in plain sight all along.",
  "I hope the story gives you a few good scares, keeps you guessing, and leaves you thinking about a thing or two long after you’ve finished reading.",
  "And if Emma happens to make you a little uncomfortable, well, history can do that when you look deep enough into its darker corners. Don’t say I didn’t warn you.",
];

export function AuthorSection() {
  return (
    <section id="author" className="section-anchor border-t border-antique/15 bg-[#0d0b09]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 md:grid-cols-[minmax(240px,360px)_minmax(0,1fr)] md:gap-14 md:px-12 md:py-24 lg:gap-20 lg:px-16">
        <FadeIn className="mx-auto w-full max-w-[360px] md:sticky md:top-28 md:self-start">
          <div className="relative aspect-[4/5] overflow-hidden border border-antique/25">
            <Image
              src="/images/author-larry-lowe.jpg"
              alt="Larry Lowe, author of The First Resident of Briar Glen"
              fill
              sizes="(max-width: 768px) 360px, 360px"
              className="object-cover object-[50%_22%]"
            />
          </div>
          <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-aged/70 md:text-left">
            Larry Lowe
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="max-w-[640px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-antique">From the Author</p>
          <h2 className="mt-5 font-serif text-4xl font-normal leading-tight text-parchment md:text-5xl">
            A Note from the Author
          </h2>
          <div className="mt-8 space-y-5 font-serif text-[20px] leading-[1.6] text-aged">
            {note.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 font-serif text-2xl italic text-antique">Larry Lowe</p>

          {/* Dedication — kept separate from the author's note */}
          <div className="mt-12 border-t border-antique/15 pt-8">
            <p className="font-serif text-xl italic leading-relaxed text-aged/85">
              &ldquo;And for the ancestors, whose names, stories, and silences still ask to be remembered.&rdquo;
            </p>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.22em] text-aged/55">
              From the Dedication · Published by Partner54 Digital
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
