/**
 * /success?session_id=cs_xxx
 *
 * Post-purchase landing page. Verifies Stripe payment server-side before
 * showing the download button. Unpaid or invalid sessions see an error message.
 */

import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { RecoverPurchase } from "@/components/RecoverPurchase";
import { EbookDownloads, OwnershipNote, type Remaining } from "@/components/EbookDownloads";
import { allowance, getDownloadRecord, newRecord } from "@/lib/downloadRecords";
import { getPaidAt } from "@/lib/purchase";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

function downloadHref(sessionId: string, format: "pdf" | "epub"): string {
  return "/api/download-token?session_id=" + encodeURIComponent(sessionId) + "&format=" + format;
}

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = params.session_id;

  let isPaid = false;
  let remaining: Remaining | null = null;
  let inWindow = true;

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      isPaid = session.payment_status === "paid";
    } catch {
      isPaid = false;
    }
  }

  // Downloads left per format. Display only; the download route enforces the limits.
  if (isPaid && sessionId) {
    try {
      const paidAt = () => getPaidAt(sessionId);
      const record = (await getDownloadRecord(sessionId, paidAt)) ?? newRecord(await paidAt());
      const a = allowance(record);
      remaining = a.remaining;
      inWindow = a.inWindow;
    } catch {
      remaining = null;
    }
  }

  return (
    <main className="min-h-screen bg-charcoal px-5 py-32 text-parchment">
      <div className="mx-auto max-w-2xl rounded-sm border border-antique/25 bg-moss p-6 sm:p-10">

        {isPaid && sessionId ? (
          <>
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
            <OwnershipNote />
            <EbookDownloads
              pdfHref={downloadHref(sessionId, "pdf")}
              epubHref={downloadHref(sessionId, "epub")}
              remaining={remaining}
              inWindow={inWindow}
            />
            {remaining && (remaining.pdf === 0 || remaining.epub === 0) && (
              <p className="mt-4 text-sm text-aged/75">
                Need another download?{" "}
                <Link href="/success" className="text-antique underline hover:text-parchment">
                  Recover your purchase
                </Link>{" "}
                with your purchase email and the last 4 digits of your card.
              </p>
            )}
          </>
        ) : (
          <RecoverPurchase returning={!sessionId} />
        )}

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
            Instagram and Facebook - @thefirstresident
          </p>
        </div>

        <p className="mt-8 text-sm text-aged/75">
          Trouble downloading?{" "}
          <a
            href="mailto:support@thefirstresident.com"
            className="text-antique underline hover:text-parchment"
          >
            Contact support@thefirstresident.com
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
