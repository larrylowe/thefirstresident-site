import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-charcoal px-5 py-32 text-parchment">
      <div className="mx-auto max-w-3xl rounded-sm border border-antique/25 bg-moss p-10">
        <p className="text-sm uppercase tracking-[0.28em] text-antique">Purchase Confirmed</p>
        <h1 className="mt-4 font-serif text-5xl">Thank you for your purchase.</h1>
        <p className="mt-6 text-lg leading-8 text-aged">
          Your digital download is ready. We appreciate your support and hope you enjoy
          stepping into the world of Briar Glen.
        </p>
        <a
          href="/samples/first-resident-sample.pdf"
          download
          className="mt-8 inline-flex rounded-sm border border-antique px-7 py-4 text-sm uppercase tracking-[0.18em] text-parchment transition hover:bg-antique hover:text-charcoal"
        >
          Download PDF
        </a>
        <p className="mt-8 text-sm text-aged">
          If you have trouble opening or receiving your file, contact{" "}
          <a href="mailto:partn54digital@gmail.com" className="underline hover:text-parchment">
            partn54digital@gmail.com
          </a>
          .
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
