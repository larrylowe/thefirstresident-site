import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ChelseaSection } from "@/components/ChelseaSection";
import { VideoSection } from "@/components/VideoSection";
import { CommerceSection } from "@/components/CommerceSection";
import { HistorySection } from "@/components/HistorySection";
import { ArchivesSection } from "@/components/ArchivesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { PrivacyNotice } from "@/components/WhyBuyDirect";

// Landing page section order (matches approved mockup):
//   1. Hero           - Section 1 House.png
//   2. Chelsea        - Section 2 Chelsea.png (no button per brief)
//   3. Video Synopsis - Section 3 laptop and wine.png
//   4. Commerce       - Section 4 Commerce section.png
//   5. History        - Section 5 History.png
//   6. Archives       - Section 6 Archives.png
//   7. CTA / RSVP     - Section 7 CTA.png
//   Footer

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ChelseaSection />
      <VideoSection />
      <CommerceSection />
      <HistorySection />
      <ArchivesSection />
      <CTASection />
      <Footer />
      <PrivacyNotice />
    </main>
  );
}
