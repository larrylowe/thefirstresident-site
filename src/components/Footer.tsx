import Link from "next/link";

const sampleUrl = "/samples/first-resident-sample.pdf";

const footerLinks = [
  { href: "#hero", label: "Home", external: false },
  { href: sampleUrl, label: "Read a Sample", external: true },
  { href: "#chelsea", label: "The Mystery", external: false },
  { href: "#history", label: "History & Hauntings", external: false },
  { href: "/archive", label: "Investigative Archives", external: false },
  { href: "#commerce", label: "Buy the Ebook", external: false },
  { href: "#cta", label: "Stay Close", external: false },
  { href: "/privacy", label: "Terms of Use", external: false },
  { href: "/privacy", label: "Privacy", external: false },
];

export function Footer() {
  return (
    <footer id="footer" className="border-t border-antique/20 bg-charcoal pt-14 pb-10">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr_auto]">

          {/* Logo */}
          <div>
            <a
              href="#hero"
              className="font-serif text-sm uppercase leading-[1.5] tracking-[0.14em] text-parchment transition hover:text-antique"
            >
              The First<br />Resident of<br />Briar Glen
            </a>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-[0.16em] text-aged/70 transition hover:text-antique"
                    >
                      {link.label}
                    </a>
                  ) : link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="text-[11px] uppercase tracking-[0.16em] text-aged/70 transition hover:text-antique"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-[11px] uppercase tracking-[0.16em] text-aged/70 transition hover:text-antique"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex flex-row gap-5 md:flex-col md:items-end md:justify-start">
            {/* TODO: Replace # href with confirmed Facebook page URL */}
            <a href="#" aria-label="Facebook" className="text-aged/60 transition hover:text-antique">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* TODO: Replace # href with confirmed Instagram profile URL */}
            <a href="#" aria-label="Instagram" className="text-aged/60 transition hover:text-antique">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="mailto:support@thefirstresident.com" aria-label="Email" className="text-aged/60 transition hover:text-antique">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-antique/15 pt-6">
          <p className="text-[11px] uppercase tracking-[0.14em] text-aged/40">
            &copy; {new Date().getFullYear()} Larry Lowe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
