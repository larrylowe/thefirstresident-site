import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
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
      <body>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '950959717764812');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=950959717764812&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {children}
      </body>
    </html>
  );
}
