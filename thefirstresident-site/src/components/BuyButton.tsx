"use client";

import { useState } from "react";

export function BuyButton({ children = "Buy the Ebook", className = "" }: { children?: React.ReactNode; className?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout could not be started.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not be started.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`rounded-sm bg-antique px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-charcoal transition hover:bg-aged disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      >
        {loading ? "Opening checkout..." : children}
      </button>
      {error && <p className="mt-3 text-sm text-red-200">{error}</p>}
    </div>
  );
}
