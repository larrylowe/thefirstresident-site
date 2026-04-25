import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-charcoal px-5 py-32 text-parchment">
      <div className="mx-auto max-w-3xl rounded-sm border border-antique/25 bg-moss p-10">
        <p className="text-sm uppercase tracking-[0.28em] text-antique">Purchase Confirmed</p>
        <h1 className="mt-4 font-serif text-5xl">Welcome to Briar Glen</h1>
        <p className="mt-6 text-lg leading-8 text-aged">Thank you for purchasing <em>The First Resident of Briar Glen</em> by Larry Lowe. This page is ready for the final fulfillment method: manual email delivery, a controlled download link, or webhook-confirmed private access.</p>
        <p className="mt-4 text-aged">For launch testing, confirm the purchase in your Stripe dashboard before sending the final file.</p>
        <Link href="/" className="mt-8 inline-flex rounded-sm border border-antique px-7 py-4 text-sm uppercase tracking-[0.18em] text-parchment transition hover:bg-antique hover:text-charcoal">Return Home</Link>
      </div>
    </main>
  );
}
