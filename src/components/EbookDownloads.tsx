import Link from "next/link";

export type Remaining = { pdf: number; epub: number };

const buttonClass =
  "inline-flex justify-center rounded-sm bg-antique px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-charcoal transition hover:bg-aged";
const disabledClass =
  "inline-flex cursor-not-allowed justify-center rounded-sm border border-antique/30 px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-aged/50";

function countLine(label: string, n: number, inWindow: boolean): string {
  if (inWindow && n <= 3) return `${label}: ${n} of 3 downloads remaining.`;
  return `${label}: ${n} ${n === 1 ? "download" : "downloads"} remaining.`;
}

/** The ownership explanation for the success and recovery pages. */
export function OwnershipNote() {
  return (
    <div className="mt-8 border-t border-antique/20 pt-8">
      <h2 className="font-serif text-3xl leading-tight text-parchment">Your book. Yours to keep.</h2>
      <p className="mt-4 leading-7 text-aged">
        Your purchase of <em>The First Resident of Briar Glen</em> is yours to keep, with both PDF
        and EPUB editions included.
      </p>
      <p className="mt-3 leading-7 text-aged">
        You have 14 days to download your files, with up to three downloads per format.
      </p>
      <p className="mt-3 leading-7 text-aged">
        <strong className="font-medium text-parchment">Didn&rsquo;t get around to downloading? No problem.</strong>{" "}
        You can return at any time and securely recover access to your purchased ebook using your
        original purchase information.
      </p>
      <p className="mt-3 leading-7 text-aged">
        Once downloaded, the files are yours to keep and read whenever you wish.
      </p>
    </div>
  );
}

/** DOWNLOAD PDF / DOWNLOAD EPUB with optional per-format counts, plus the Archive link. */
export function EbookDownloads({
  pdfHref,
  epubHref,
  remaining,
  inWindow = true,
}: {
  pdfHref: string;
  epubHref: string;
  remaining?: Remaining | null;
  inWindow?: boolean;
}) {
  const formats = [
    { key: "pdf" as const, label: "PDF", href: pdfHref },
    { key: "epub" as const, label: "EPUB", href: epubHref },
  ];
  return (
    <>
      <p className="mt-6 text-sm italic text-aged/75">
        Your purchase includes both formats. Download either or both.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {formats.map(({ key, label, href }) =>
          remaining && remaining[key] <= 0 ? (
            <span key={key} className={disabledClass} aria-disabled="true">
              Download {label}
            </span>
          ) : (
            <a key={key} href={href} className={buttonClass}>
              Download {label}
            </a>
          )
        )}
        <Link
          href="/archive"
          className="inline-flex justify-center rounded-sm border border-antique/60 px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-parchment transition hover:bg-antique hover:text-charcoal"
        >
          Enter the Archive
        </Link>
      </div>
      {remaining && (
        <div className="mt-4 space-y-1 text-sm text-aged/75">
          {formats.map(({ key, label }) => (
            <p key={key}>{countLine(label, remaining[key], inWindow)}</p>
          ))}
        </div>
      )}
    </>
  );
}
