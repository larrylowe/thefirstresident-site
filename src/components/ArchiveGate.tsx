"use client";

import Image from "next/image";
import { useState } from "react";
import { BuyButton } from "./BuyButton";

export function ArchiveGate() {
  const [email, setEmail] = useState("");
  const [restoreStatus, setRestoreStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [restoreMessage, setRestoreMessage] = useState("");

  async function handleRestore(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setRestoreStatus("loading");
    setRestoreMessage("");

    try {
      const res = await fetch("/api/archive/restore-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.message) {
        setRestoreStatus("success");
        setRestoreMessage(data.message);
        // Small delay then reload so the cookie takes effect
        setTimeout(() => window.location.reload(), 1200);
      } else {
        setRestoreStatus("error");
        setRestoreMessage(
          data.error ||
            "We could not verify an ebook purchase for that email. Please check the email used at checkout or purchase access below."
        );
      }
    } catch {
      setRestoreStatus("error");
      setRestoreMessage(
        "Something went wrong. Please try again or contact support."
      );
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-charcoal">
      {/* Background door image */}
      <Image
        src="/images/archive-door-entry.png"
        alt="The locked entrance to the Briar Glen Archive"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient overlay — dark on the right for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-l from-charcoal/97 via-charcoal/80 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40" />

      {/* Content — right-side panel */}
      <div className="relative z-10 flex min-h-screen items-center justify-end px-6 py-28 md:px-14 lg:px-20">
        <div className="w-full max-w-sm">

          {/* Label */}
          <p className="text-[10px] uppercase tracking-[0.32em] text-antique">
            Briar Glen Archive
          </p>

          {/* Ornamental divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px w-8 bg-antique/50" />
            <div className="h-1 w-1 rotate-45 bg-antique/60" />
            <div className="h-px w-8 bg-antique/50" />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-[0.03em] text-parchment md:text-4xl">
            The Whitmore Investigation
          </h1>

          <p className="mt-4 text-sm leading-7 text-aged">
            Some records were never meant to be filed.
          </p>

          {/* Spoiler warning */}
          <div className="mt-5 border border-antique/30 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-antique/80">
              ⚠ Potential spoilers inside. Enter at your own discretion.
            </p>
          </div>

          {/* Access info */}
          <p className="mt-6 text-sm leading-7 text-aged/80">
            Archive access is included with purchase of the complete ebook.
          </p>
          <p className="mt-1 text-sm text-antique">Launch access: $4.99</p>

          {/* Primary CTA */}
          <div className="mt-6">
            <BuyButton className="w-full justify-center text-[11px] tracking-[0.22em]">
              Buy the Ebook to Enter
            </BuyButton>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-antique/20" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-aged/50">
              Already purchased?
            </span>
            <div className="h-px flex-1 bg-antique/20" />
          </div>

          {/* Restore access form */}
          <p className="text-[11px] leading-6 text-aged/70">
            Restore archive access using the email from your checkout receipt.
          </p>

          <form onSubmit={handleRestore} className="mt-4 flex flex-col gap-3" noValidate>
            <label
              htmlFor="restore-email"
              className="text-[10px] uppercase tracking-[0.22em] text-antique/70"
            >
              Checkout email
            </label>
            <input
              id="restore-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full border border-antique/30 bg-charcoal/60 px-4 py-3 text-sm text-parchment placeholder-aged/40 focus:border-antique/70 focus:outline-none"
            />
            <button
              type="submit"
              disabled={restoreStatus === "loading"}
              className="border border-antique/60 px-6 py-3 text-[10px] uppercase tracking-[0.24em] text-parchment transition hover:border-antique hover:bg-antique/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {restoreStatus === "loading" ? "Checking…" : "Restore Access"}
            </button>
          </form>

          {/* Restore status messages */}
          {restoreStatus === "error" && restoreMessage && (
            <p className="mt-4 text-[12px] leading-6 text-aged/80">
              {restoreMessage}
            </p>
          )}
          {restoreStatus === "success" && restoreMessage && (
            <p className="mt-4 text-[12px] leading-6 text-antique">
              {restoreMessage}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
