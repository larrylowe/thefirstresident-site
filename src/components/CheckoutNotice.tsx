"use client";

import { useEffect, useState } from "react";

/** Shown when /buy could not start checkout and sent the visitor back here. */
export function CheckoutNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(new URLSearchParams(window.location.search).get("checkout") === "unavailable");
  }, []);

  if (!show) return null;

  return (
    <p role="alert" className="mt-5 text-sm text-red-200">
      Checkout could not be started just now. Please try again in a moment, or contact{" "}
      <a href="mailto:support@thefirstresident.com" className="underline">support@thefirstresident.com</a>.
    </p>
  );
}
