"use client";

import Link from "next/link";
import { useState } from "react";

const inputClass =
  "w-full border border-antique/40 bg-charcoal px-4 py-3 text-base text-parchment placeholder-aged/50 focus:border-antique focus:outline-none";
const labelClass = "text-[11px] font-medium uppercase tracking-[0.22em] text-antique";

/**
 * Finds a paid ebook purchase by checkout email and the card's last 4 digits
 * (via /api/archive/restore-access) and offers the verified download.
 */
export function RecoverPurchase() {
  const [email, setEmail] = useState("");
  const [last4, setLast4] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "found">("idle");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

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
      const res = await fetch("/api/archive/restore-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), last4 }),
      });
      const data = await res.json();

      if (res.ok && data.downloadUrl) {
        setStatus("found");
        setMessage(data.message);
        setDownloadUrl(data.downloadUrl);
        return;
      }
      setStatus("error");
      setMessage(data.error || "We could not match those details to a completed ebook purchase.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or contact support.");
    }
  }

  if (status === "found") {
    return (
      <div className="mt-8">
        <p className="text-antique" role="status">{message}</p>
        <p className="mt-2 text-sm text-aged/75">
          This download link works for 10 minutes. You can return here any time to get a new one.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={downloadUrl}
            className="inline-flex justify-center rounded-sm bg-antique px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-charcoal transition hover:bg-aged"
          >
            Download the e-book
          </a>
          <Link
            href="/archive"
            className="inline-flex justify-center rounded-sm border border-antique/60 px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-parchment transition hover:bg-antique hover:text-charcoal"
          >
            Enter the Archive
          </Link>
        </div>
      </div>
    );
  }

  return (
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
  );
}
