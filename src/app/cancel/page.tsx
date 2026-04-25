import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-charcoal px-5 py-32 text-parchment">
      <div className="mx-auto max-w-3xl rounded-sm border border-antique/25 bg-moss p-10">
        <p className="text-sm uppercase tracking-[0.28em] text-antique">Checkout Canceled</p>
        <h1 className="mt-4 font-serif text-5xl">No purchase was completed</h1>
        <p className="mt-6 text-lg leading-8 text-aged">You can return to the official site and continue reading about <em>The First Resident of Briar Glen</em>.</p>
        <Link href="/#buy" className="mt-8 inline-flex rounded-sm bg-antique px-7 py-4 text-sm uppercase tracking-[0.18em] text-charcoal transition hover:bg-aged">Return to Purchase</Link>
      </div>
    </main>
  );
}
