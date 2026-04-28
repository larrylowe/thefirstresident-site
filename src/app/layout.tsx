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
  title: "The First Resident of Briar Glen | Horror Novel by Larry Lowe",
  description: "A character-driven horror novel about a child who senses a dangerous presence at Briar Glen, a quiet residence with dark history, family secrets, and supernatural suspense.",
  keywords: "horror novel, supernatural suspense, family secrets, dark history, character-driven horror, unsettling childhood fear, atmospheric horror, Larry Lowe, The First Resident of Briar Glen",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thefirstresident.com"),
  openGraph: {
    title: "The First Resident of Briar Glen",
    description: "Nine-year-old Chelsea Parker visits Briar Glen and discovers that one resident has been waiting for her family to return.",
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
