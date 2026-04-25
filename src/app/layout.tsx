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
  description: "The official site for The First Resident of Briar Glen, a Southern Gothic suspense novel by Larry Lowe.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thefirstresident.com"),
  openGraph: {
    title: "The First Resident of Briar Glen",
    description: "Every home has a first resident. Some never leave.",
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
