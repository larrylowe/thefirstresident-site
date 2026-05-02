/**
 * /success?session_id=cs_xxx
 *
 * Post-purchase landing page. Reads the Stripe session ID from the URL and
 * shows the download button that initiates the two-step secure download flow.
 *
 * No Stripe API calls happen here — verification is deferred to /api/download-token.
 */

import Link from "next/link";

// Next.js 15+ passes searchParams as a Promise in server components
type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = params.session_id;

  return (
    <main className="min-h-screen bg-charcoal px-5 py-32 text-parchment">
      <div className="mx-auto max-w-2xl rounded-sm border border-antique/25 bg-moss p-10">

        {/* Header */}
        <p className="text-sm uppercase tracking-[0.28em] text-antique">
          Purchase Complete
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight">
          Thank you for entering Briar Glen.
        </h1>
        <p className="mt-6 text-lg leading-8 text-aged">
          Your copy of <em>The First Resident of Briar Glen</em> is ready. Please
          download it below and save it somewhere safe.
        </p>
        <p className="mt-3 text-sm text-aged/75">
          Your secure download link is available for 72 hours and allows up to 3 downloads.
        </p>

        {/* Download button — links to /api/download-token which validates and redirects */}
        {sessionId ? (
          <a
            href={`/api/download-token?session_id=${encodeURIComponent(sessionId)}`}
            className="mt-8 inline-flex rounded-sm bg-antique px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-charcoal transition hover:bg-aged"
          >
            Download the e-book
          </a>
        ) : (
          <div className="mt-8 rounded-sm border border-antique/25 bg-charcoal/50 p-6">
            <p className="text-aged">
              We could not find your purchase session. If you completed a purchase,
              please check your confirmation email or contact{" "}
              <a
                href="mailto:partn54digital@gmail.com"
                className="text-antique underline hover:text-parchment"
              >
                partn54digital@gmail.com
              </a>{" "}
              with your receipt.
            </p>
          </div>
        )}

        {/* Share nudge */}
        <div className="mt-12 border-t border-antique/20 pt-8">
          <p className="text-sm uppercase tracking-[0.18em] text-antique">
            Please share the website, not the file
          </p>
          <a
            href="https://www.thefirstresident.com"
            className="mt-2 inline-block font-serif text-xl text-parchment underline hover:text-antique"
          >
            www.thefirstresident.com
          </a>
          <p className="mt-6 text-sm text-aged">
            For updates, artwork, story notes, and future releases:
          </p>
          <p className="mt-1 text-sm tracking-wide text-antique">
            Instagram and Facebook — @thefirstresident
          </p>
        </div>

        {/* Support & navigation */}
        <p className="mt-8 text-sm text-aged/75">
          Trouble downloading?{" "}
          <a
            href="mailto:partn54digital@gmail.com"
            className="text-antique underline hover:text-parchment"
          >
            Contact partn54digital@gmail.com
          </a>{" "}
          with your receipt and we will help.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-antique underline hover:text-parchment"
        >
          Return Home
        </Link>

      </div>
    </main>
  );
}
