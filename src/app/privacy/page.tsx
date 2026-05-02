import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | The First Resident of Briar Glen",
  description: "Privacy Policy for The First Resident of Briar Glen website.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-charcoal text-aged">
      <div className="mx-auto max-w-3xl px-5 py-24 md:px-8">
        <Link
          href="/"
          className="mb-10 inline-block text-sm uppercase tracking-[0.18em] text-antique/70 transition hover:text-antique"
        >
          ← Back
        </Link>

        <h1 className="font-serif text-4xl uppercase tracking-[0.08em] text-parchment md:text-5xl">
          Privacy Policy
        </h1>
        <div className="my-8 h-px w-24 bg-antique/50" />

        <div className="space-y-8 text-base leading-8 text-aged/90">

          <p>
            The First Resident of Briar Glen respects your privacy. This Privacy Policy explains how
            information may be collected, used, and protected when you visit this website, read the
            free sample, watch related media, or purchase the digital edition.
          </p>

          <section>
            <h2 className="mb-3 font-serif text-xl uppercase tracking-[0.14em] text-parchment">
              Information We Collect
            </h2>
            <p>
              We may collect basic information about how visitors use the website, including page views,
              clicks, device information, browser type, referral source, and general location information
              such as city, region, or country.
            </p>
            <p className="mt-4">
              If you purchase the ebook, payment and checkout information may be collected and processed
              by Stripe. We do not store full payment card details on this website.
            </p>
            <p className="mt-4">
              If you contact us directly, we may receive the information you choose to provide, such as
              your name, email address, and message.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl uppercase tracking-[0.14em] text-parchment">
              Cookies, Pixels, and Analytics
            </h2>
            <p>
              This website may use cookies, pixels, analytics tools, and similar technologies to
              understand site activity, improve the visitor experience, measure advertising performance,
              and support future marketing.
            </p>
            <p className="mt-4">
              This may include tools such as the Meta Pixel. These tools may help us understand whether
              visitors viewed pages, clicked links, downloaded the free sample, watched related media, or
              purchased the ebook.
            </p>
            <p className="mt-4">
              Where available, advertising platforms may use hashed or protected customer information for
              measurement, attribution, and audience matching. This helps improve the relevance and
              effectiveness of advertising without requiring us to share full payment information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl uppercase tracking-[0.14em] text-parchment">
              How We Use Information
            </h2>
            <p>Information may be used to:</p>
            <ul className="mt-3 list-inside list-disc space-y-2 pl-2">
              <li>operate and improve the website;</li>
              <li>provide access to the free sample and digital ebook;</li>
              <li>process purchases through Stripe;</li>
              <li>respond to support requests;</li>
              <li>understand which content and offers are most useful to visitors;</li>
              <li>measure advertising performance;</li>
              <li>improve future books, chapters, offers, and related creative projects.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl uppercase tracking-[0.14em] text-parchment">
              Digital Purchases
            </h2>
            <p>
              Digital purchases are processed securely by Stripe. Once a digital file has been delivered
              or accessed, sales are final unless there is a technical issue that prevents access to the
              purchased file. If you experience a problem receiving or opening your file, please contact
              support so we can help resolve it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl uppercase tracking-[0.14em] text-parchment">
              Third-Party Services
            </h2>
            <p>
              This website may link to or use third-party services, including Stripe, YouTube, Meta,
              Facebook, Instagram, TikTok, analytics providers, hosting providers, and other technology
              services needed to operate and promote the book. These services may process information
              according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl uppercase tracking-[0.14em] text-parchment">
              Your Choices
            </h2>
            <p>
              You may adjust cookie, browser, and advertising preferences through your browser settings,
              device settings, or the privacy tools provided by advertising platforms.
            </p>
            <p className="mt-4">
              You may also choose not to purchase the ebook or not to contact us directly if you do not
              wish to provide personal information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl uppercase tracking-[0.14em] text-parchment">
              Data Security
            </h2>
            <p>
              We use reasonable measures and trusted service providers to help protect information
              connected to the website and digital purchase process. No website or online service can
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl uppercase tracking-[0.14em] text-parchment">
              Children
            </h2>
            <p>
              This website is intended for general audiences interested in books and fiction. It is not
              directed to children under 13, and we do not knowingly collect personal information from
              children under 13.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl uppercase tracking-[0.14em] text-parchment">
              Contact
            </h2>
            <p>
              For privacy questions, purchase support, or download issues, please contact:
            </p>
            {/* PLACEHOLDER: Confirm support@thefirstresident.com is active before deploying */}
            <p className="mt-3">
              <a
                href="mailto:support@thefirstresident.com"
                className="text-antique underline underline-offset-4 hover:text-parchment"
              >
                support@thefirstresident.com
              </a>
            </p>
          </section>

          <p className="pt-4 text-sm text-aged/50">Last updated: May 2026</p>
        </div>
      </div>
    </main>
  );
}
