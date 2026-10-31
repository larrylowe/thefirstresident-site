/**
 * Transactional email for purchase recovery codes and the day-7 reminder.
 *
 * Sends through Resend's HTTP API with fetch (no SDK). It does nothing until
 * both are set in Vercel:
 *   RESEND_API_KEY      – API key from a Resend account
 *   EMAIL_FROM_ADDRESS  – a sending address on a domain verified in Resend,
 *                         e.g. orders@thefirstresident.com
 * The display name is always "Partner54 Digital".
 */

export const SENDER_NAME = "Partner54 Digital";

export function emailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY && !!process.env.EMAIL_FROM_ADDRESS;
}

export function senderHeader(): string {
  return `${SENDER_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`;
}

export interface OutgoingEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Stops Resend sending the same message twice if a request is retried. */
  idempotencyKey?: string;
}

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };

/** Sends one email, retrying once on a rate limit or server error. */
export async function sendEmail(message: OutgoingEmail): Promise<SendResult> {
  if (!emailConfigured()) return { ok: false, reason: "not_configured" };

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          ...(message.idempotencyKey ? { "Idempotency-Key": message.idempotencyKey } : {}),
        },
        body: JSON.stringify({
          from: senderHeader(),
          to: [message.to],
          subject: message.subject,
          html: message.html,
          text: message.text,
        }),
      });
      if (res.ok) return { ok: true };
      console.error("Email send failed with status", res.status);
      if (res.status !== 429 && res.status < 500) break;
    } catch (err) {
      console.error("Email send error:", (err as Error).message);
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  return { ok: false, reason: "failed" };
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.thefirstresident.com").replace(/\/+$/, "");
}

/** The secure recovery page: email + card last 4, then an emailed code. */
export function recoveryUrl(): string {
  return siteUrl() + "/success";
}
