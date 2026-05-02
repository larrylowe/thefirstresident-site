import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-antique/20 bg-charcoal py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-4 text-sm text-aged md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-lg uppercase tracking-[0.18em] text-parchment">The First Resident of Briar Glen</p>
          <div className="flex flex-wrap items-center gap-5">
            {/* PLACEHOLDER: Add social links below once Instagram/Facebook/TikTok URLs are confirmed */}
            <Link
              href="/privacy"
              className="text-sm uppercase tracking-[0.14em] text-aged/70 transition hover:text-antique"
            >
              Privacy Policy
            </Link>
            <a
              href="mailto:support@thefirstresident.com"
              className="text-sm uppercase tracking-[0.14em] text-aged/70 transition hover:text-antique"
            >
              Contact
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm text-aged/50">© {new Date().getFullYear()} Larry Lowe. All rights reserved.</p>
      </div>
    </footer>
  );
}
