"use client";

import { useState } from "react";
import { EbookDownloads, OwnershipNote, type Remaining } from "@/components/EbookDownloads";

const inputClass =
  "w-full border border-antique/40 bg-charcoal px-4 py-3 text-base text-parchment placeholder-aged/50 focus:border-antique focus:outline-none";
const labelClass = "text-[11px] font-medium uppercase tracking-[0.22em] text-antique";
const secondaryButton =
  "rounded-sm border border-antique/60 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-parchment transition hover:bg-antique hover:text-charcoal disabled:opacity-60";

type Access = {
  message: string;
  downloadUrl: string;
  remaining: Remaining;
  inWindow: boolean;
  renewal: "not_needed" | "available" | "wait";
  nextRenewalAt: string | null;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Recover My Purchase → Verify Purchase → Confirm Email Code → Download.
 * Finds a paid ebook purchase by checkout email and the card's last 4 digits
 * (via /api/archive/restore-access) and offers the verified downloads. When a
 * format has none left, it can email a one-time code (/api/archive/send-code)
 * that renews them (/api/archive/verify-code). Nothing is kept in browser
 * storage; the details stay in this component's memory only.
 */
export function RecoverPurchase({ returning = false }: { returning?: boolean }) {
  const [email, setEmail] = useState("");
  const [last4, setLast4] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "found">("idle");
  const [message, setMessage] = useState("");
  const [access, setAccess] = useState<Access | null>(null);
  const [codeStep, setCodeStep] = useState<"none" | "sending" | "sent" | "verifying">("none");
  const [code, setCode] = useState("");
  const [codeMessage, setCodeMessage] = useState("");

  async function post(path: string, extra: Record<string, string> = {}) {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), last4, ...extra }),
    });
    return { res, data: await res.json() };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || last4.length !== 4) {
      setStatus("error");
      setMessage("Enter the email used at checkout and the last 4 digits of the card.");
      return;
    }
    setStatus("loading");
    setMessage("");

    try {
      const { res, data } = await post("/api/archive/restore-access");
      if (res.ok && data.downloadUrl) {
        setStatus("found");
        setAccess(data);
        return;
      }
      setStatus("error");
      setMessage(data.error || "We could not match those details to a completed ebook purchase.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or contact support.");
    }
  }

  async function requestCode() {
    setCodeStep("sending");
    setCodeMessage("");
    try {
      const { res, data } = await post("/api/archive/send-code");
      setCodeStep(res.ok ? "sent" : "none");
      setCodeMessage(
        (res.ok ? data.message : data.error) +
          (data.nextRenewalAt ? " You can add more on " + formatDate(data.nextRenewalAt) + "." : "")
      );
    } catch {
      setCodeStep("none");
      setCodeMessage("Something went wrong. Please try again.");
    }
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setCodeStep("verifying");
    setCodeMessage("");
    try {
      const { res, data } = await post("/api/archive/verify-code", { code });
      if (res.ok && data.downloadUrl) {
        setAccess(data);
        setCodeStep("none");
        setCode("");
        setCodeMessage(data.message);
        return;
      }
      setCodeStep("sent");
      setCodeMessage(data.error || "That code is incorrect or has expired.");
    } catch {
      setCodeStep("sent");
      setCodeMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "found" && access) {
    return (
      <>
        <p className="text-sm uppercase tracking-[0.28em] text-antique">
          Purchase Complete
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight">
          Thank you for entering Briar Glen.
        </h1>
        <p className="mt-6 text-lg leading-8 text-aged" role="status">
          {access.message} Your copy of <em>The First Resident of Briar Glen</em> is ready.
          Please download it below and save it somewhere safe.
        </p>
        <p className="mt-3 text-sm text-aged/75">
          These download links work for 15 minutes. You can return here any time to get new ones.
        </p>
        <OwnershipNote />
        <EbookDownloads
          pdfHref={access.downloadUrl + "&format=pdf"}
          epubHref={access.downloadUrl + "&format=epub"}
          remaining={access.remaining}
          inWindow={access.inWindow}
        />

        {access.renewal === "available" && (
          <div className="mt-8 border-t border-antique/20 pt-6">
            <p className="text-sm leading-6 text-aged">
              Need another download? We can email a one-time code to the address used for this
              purchase. Entering it adds one more PDF and one more EPUB download.
            </p>
            {codeStep === "none" || codeStep === "sending" ? (
              <button type="button" onClick={requestCode} disabled={codeStep === "sending"} className={`mt-4 ${secondaryButton}`}>
                {codeStep === "sending" ? "Sending…" : "Email me a code"}
              </button>
            ) : (
              <form onSubmit={submitCode} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end" noValidate>
                <div className="flex flex-col gap-2">
                  <label htmlFor="recover-code" className={labelClass}>
                    6-digit code from your email
                  </label>
                  <input
                    id="recover-code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className={`${inputClass} sm:max-w-[10rem]`}
                  />
                </div>
                <button type="submit" disabled={codeStep === "verifying" || code.length !== 6} className={secondaryButton}>
                  {codeStep === "verifying" ? "Checking…" : "Confirm code"}
                </button>
                <button type="button" onClick={requestCode} className="text-left text-xs text-antique underline hover:text-parchment sm:mb-3">
                  Send a new code
                </button>
              </form>
            )}
          </div>
        )}
        {access.renewal === "wait" && access.nextRenewalAt && (
          <p className="mt-6 text-sm text-aged/75">
            More downloads can be added once every 30 days. You can add more on{" "}
            {formatDate(access.nextRenewalAt)}, or contact support@thefirstresident.com if you need help sooner.
          </p>
        )}
        <p role="alert" className="mt-4 min-h-[1.5rem] text-sm leading-6 text-aged">
          {codeMessage}
        </p>
      </>
    );
  }

  return (
    <>
      <p className="text-sm uppercase tracking-[0.28em] text-antique">
        {returning ? "Recover My Purchase" : "Find Your Purchase"}
      </p>
      <h1 className="mt-4 font-serif text-5xl leading-tight">
        {returning ? (
          <>Welcome back to Briar Glen.</>
        ) : (
          <>We couldn&rsquo;t confirm a purchase from this link.</>
        )}
      </h1>
      <p className="mt-6 text-lg leading-8 text-aged">
        If you bought the ebook, enter the email you used at checkout and the last
        4 digits of the card you paid with, and we will take you to your download.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div className="flex flex-col gap-2">
          <label htmlFor="recover-email" className={labelClass}>
            Email used at checkout
          </label>
          <input
            id="recover-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="recover-last4" className={labelClass}>
            Last 4 digits of the card you paid with
          </label>
          <input
            id="recover-last4"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={last4}
            onChange={(e) => setLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="1234"
            required
            aria-describedby="recover-message"
            className={`${inputClass} sm:max-w-[10rem]`}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-sm bg-antique px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-charcoal transition hover:bg-aged disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Checking…" : "Find my purchase"}
        </button>
        <p id="recover-message" role="alert" className="min-h-[1.5rem] text-sm leading-6 text-aged">
          {message}
        </p>
      </form>
      <p className="mt-6 text-sm text-aged/75">
        Still stuck? Contact{" "}
        <a
          href="mailto:support@thefirstresident.com"
          className="text-antique underline hover:text-parchment"
        >
          support@thefirstresident.com
        </a>{" "}
        with your receipt.
      </p>
    </>
  );
}
