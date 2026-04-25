import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "The First Resident of Briar Glen | Larry Lowe",
  // Updated description to remove the genre label and align with the refined marketing copy.
  description: "The official site for The First Resident of Briar Glen, a novel of ancestral memory and family reckoning by Larry Lowe.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thefirstresident.com"),
  openGraph: {
    title: "The First Resident of Briar Glen",
    // Use the refined tagline in open graph metadata.
    description: "Every House Has A First Resident. This One Never Left.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
