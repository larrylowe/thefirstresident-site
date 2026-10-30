import Image from "next/image";
import { FadeIn } from "./FadeIn";

/** History: the 1830s past of the house. Shown beside the Archive card. */
export function HistorySection() {
  return (
    <article id="history" className="relative flex flex-col border-antique/15 md:border-r" style={{ scrollMarginTop: "80px" }}>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src="/images/Section%205%20History.png"
          alt="A handmade cloth figure from Heathrow, 1830s, among candles and antique objects"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0b09]/70" />
      </div>
      <FadeIn className="flex flex-1 flex-col px-5 py-10 sm:px-8 md:px-10 md:py-12 lg:px-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-antique">The History · Virginia, 1830s</p>
        <h2 className="mt-5 font-serif text-[32px] font-normal leading-[1.12] text-parchment lg:text-[40px]">
          The house is older than Briar Glen.
        </h2>
        <p className="mt-5 font-serif text-xl leading-relaxed text-aged">
          Long before Briar Glen became a residence for the elderly, the house stood on
          land worked by enslaved people. The years have changed its appearance and its
          purpose, though some things have proved considerably harder to leave behind.
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-aged/55">
          Image · Heathrow, 1830s · A handmade cloth figure
        </p>
        <div className="mt-auto pt-8">
          <p className="mb-3 text-sm leading-6 text-aged/75">
            The deeper history lives in the Whitmore Investigation archive, included with the ebook.
          </p>
          <a
            href="#archives"
            className="text-xs font-medium uppercase tracking-[0.22em] text-antique transition hover:text-parchment"
          >
            Explore the History in the Archive →
          </a>
        </div>
      </FadeIn>
    </article>
  );
}
