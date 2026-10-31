import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ChelseaSection } from "@/components/ChelseaSection";
import { VideoSection } from "@/components/VideoSection";
import { PreludeSection } from "@/components/PreludeSection";
import { CommerceSection } from "@/components/CommerceSection";
import { HistorySection } from "@/components/HistorySection";
import { ArchivesSection } from "@/components/ArchivesSection";
import { AuthorSection } from "@/components/AuthorSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { PrivacyNotice } from "@/components/WhyBuyDirect";
import { getEbookPrice } from "@/lib/price";

// Re-read the live Stripe price hourly
export const revalidate = 3600;

// Landing page section order (Phase 1 Refinement, approved):
//   1. Hero            - Section 1 House.png + approved cover + price
//   2. The Story       - Section 2 Chelsea.png
//   3. Emma + Trailer  - trailer thumbnail (Emma, 1984)
//   4. Prelude         - prelude-woman-in-the-chair.png, Prelude PDF
//   5. Offer           - approved cover
//   6/7. History | Archive side by side
//   8. A Note from the Author
//   9. Closing invitation - Section 7 CTA.png, split into pieces
//   Footer

export default async function Home() {
  const price = await getEbookPrice();

  return (
    <main>
      <Navbar price={price} />
      <Hero price={price} />
      <ChelseaSection />
      <VideoSection price={price} />
      <PreludeSection />
      <CommerceSection price={price} />
      <section aria-label="History and Archive" className="grid grid-cols-1 border-t border-antique/15 bg-[#0d0b09] md:grid-cols-2">
        <HistorySection />
        <ArchivesSection />
      </section>
      <AuthorSection />
      <CTASection price={price} />
      <Footer />
      <StickyBuyBar price={price} />
      <PrivacyNotice />
    </main>
  );
}
