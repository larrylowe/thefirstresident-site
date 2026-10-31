"use client";

import { useState } from "react";

/**
 * Finds a paid ebook purchase by checkout email (via /api/archive/restore-access)
 * and sends the buyer to the verified download page for that purchase.
 */
export function RecoverPurchase() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/archive/restore-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.downloadUrl) {
        window.location.assign(data.downloadUrl);
        return;
      }
      setStatus("error");
      setMessage(
        data.error ||
          "We could not verify an ebook purchase for that email. Please check the email used at checkout."
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or contact support.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row" noValidate>
      <label htmlFor="recover-email" className="sr-only">
        Checkout email
      </label>
      <input
        id="recover-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email used at checkout"
        required
        className="w-full flex-1 border border-antique/30 bg-charcoal/60 px-4 py-3 text-sm text-parchment placeholder-aged/40 focus:border-antique/70 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm bg-antique px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-charcoal transition hover:bg-aged disabled:opacity-60"
      >
        {status === "loading" ? "Checking…" : "Find my purchase"}
      </button>
      {message && <p className="text-sm text-aged sm:hidden">{message}</p>}
      {message && <p className="hidden text-sm text-aged sm:block sm:basis-full">{message}</p>}
    </form>
  );
}
