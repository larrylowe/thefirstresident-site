import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { product } from "@/data/product";
import { FadeIn } from "./FadeIn";

function toEmbedUrl(url: string) {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "youtube.com/embed/");
  if (url.includes("vimeo.com/")) return url.replace("vimeo.com/", "player.vimeo.com/video/");
  return url;
}

export function VideoSynopsis() {
  const embedUrl = toEmbedUrl(product.videoUrl);

  return (
    <section id="watch" className="section-anchor bg-charcoal py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-antique">Watch</p>
          <h2 className="font-serif text-4xl leading-tight text-parchment md:text-6xl">Watch the video synopsis</h2>
          <p className="mt-5 text-lg leading-8 text-aged">A cinematic introduction to the world of Briar Glen, created to set the tone without revealing the secrets inside the book.</p>
        </FadeIn>
        <FadeIn delay={0.15} className="mt-12 overflow-hidden rounded-sm border border-antique/25 bg-black shadow-2xl">
          <div className="relative aspect-video">
            {embedUrl ? (
              <iframe src={embedUrl} title="Video synopsis" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            ) : (
              <div className="relative h-full w-full">
                <Image src={product.videoPoster} alt="Video synopsis placeholder" fill sizes="100vw" className="object-cover opacity-65" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/55 text-center">
                  <PlayCircle className="mb-5 h-16 w-16 text-antique" strokeWidth={1.3} />
                  <p className="font-serif text-3xl text-parchment">Video synopsis coming soon</p>
                  <p className="mt-3 max-w-xl text-aged">Add the final video URL to the environment variable when ready.</p>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
