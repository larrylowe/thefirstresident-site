// TODO: Build out the protected Investigative Archives experience here.
// This route is currently a placeholder that can later be gated behind
// Stripe purchase verification or a download-token check.

import Link from "next/link";

export const metadata = {
  title: "Investigative Archives | The First Resident of Briar Glen",
  description:
    "Access the investigative archives — newspapers, records, and witness accounts from Briar Glen.",
};

export default function ArchivePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-antique">
        The Truth Is in the Records
      </p>
      <div className="my-5 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-antique/50" />
        <div className="h-1 w-1 rotate-45 bg-antique/60" />
        <div className="h-px w-8 bg-antique/50" />
      </div>
      <h1 className="font-serif text-4xl font-semibold uppercase leading-tight tracking-[0.05em] text-parchment md:text-6xl">
        Investigative<br />Archives
      </h1>
      <div className="my-7 h-px w-12 bg-antique/40" />
      <p className="max-w-md text-base leading-8 text-aged">
        The archives are being prepared for access. Purchase the ebook to
        unlock the full investigative record — newspapers, witness accounts,
        and the evidence behind the legend.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/#commerce"
          className="border border-antique/70 px-8 py-4 text-sm uppercase tracking-[0.2em] text-parchment transition hover:border-antique hover:bg-antique hover:text-charcoal"
        >
          Buy the Ebook
        </Link>
        <Link
          href="/"
          className="border border-antique/30 px-8 py-4 text-sm uppercase tracking-[0.2em] text-aged/70 transition hover:border-antique/60 hover:text-aged"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
