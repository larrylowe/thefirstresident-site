import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { StorySection } from "@/components/StorySection";
import { VideoSynopsis } from "@/components/VideoSynopsis";
import { SampleSection } from "@/components/SampleSection";
import { PurchaseSection } from "@/components/PurchaseSection";
import { WhyBuyDirect, LaunchBar, PrivacyNotice } from "@/components/WhyBuyDirect";
import { AuthorSection } from "@/components/AuthorSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <LaunchBar />
      <Navbar />
      <Hero />
      <TrustBar />
      <StorySection />
      <VideoSynopsis />
      <SampleSection />
      <PurchaseSection />
      <WhyBuyDirect />
      <AuthorSection />
      <FAQ />
      <Footer />
      <PrivacyNotice />
    </main>
  );
}
