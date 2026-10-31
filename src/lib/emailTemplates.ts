/**
 * The two customer emails. Both are signed by Partner54 Digital.
 */

import { escapeHtml, recoveryUrl, type OutgoingEmail } from "@/lib/email";

const wrap = (inner: string) => `<!DOCTYPE html>
<html lang="en"><body style="margin:0;background:#151512;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#f3ead8;">
<div style="max-width:560px;margin:0 auto;background:#20281f;border:1px solid rgba(198,167,92,0.3);padding:36px 32px;">
${inner}
<p style="margin:32px 0 0;font-size:16px;line-height:1.6;color:#f3ead8;"><strong>Partner54 Digital</strong><br>
<span style="color:#dfcfb0;">Publisher of <em>The First Resident of Briar Glen</em></span></p>
</div></body></html>`;

const p = (html: string) =>
  `<p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#dfcfb0;">${html}</p>`;

export function reminderEmail(to: string, sessionId: string): OutgoingEmail {
  const link = recoveryUrl();
  const button = `<p style="margin:28px 0;"><a href="${escapeHtml(link)}" style="display:inline-block;background:#c6a75c;color:#151512;text-decoration:none;padding:14px 26px;font-family:Arial,sans-serif;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;font-weight:bold;">Access Your Ebook</a></p>`;
  return {
    to,
    subject: "Your copy of The First Resident of Briar Glen is ready",
    idempotencyKey: "reminder-" + sessionId,
    html: wrap(
      p("Thank you for purchasing <em>The First Resident of Briar Glen</em>.") +
        p("We noticed that you haven&rsquo;t downloaded your ebook yet.") +
        p("Your purchase includes both PDF and EPUB editions, and you have another seven days remaining in your initial download period.") +
        button +
        p("If life gets busy, there&rsquo;s no need for concern. Your purchase remains yours, and you can securely recover access whenever you&rsquo;re ready.") +
        p("Thank you for your purchase.")
    ),
    text: [
      "Thank you for purchasing The First Resident of Briar Glen.",
      "",
      "We noticed that you haven't downloaded your ebook yet.",
      "",
      "Your purchase includes both PDF and EPUB editions, and you have another seven days remaining in your initial download period.",
      "",
      "ACCESS YOUR EBOOK",
      link,
      "",
      "If life gets busy, there's no need for concern. Your purchase remains yours, and you can securely recover access whenever you're ready.",
      "",
      "Thank you for your purchase.",
      "",
      "Partner54 Digital",
      "Publisher of The First Resident of Briar Glen",
    ].join("\n"),
  };
}

export function codeEmail(to: string, code: string): OutgoingEmail {
  return {
    to,
    subject: "Your verification code for The First Resident of Briar Glen",
    html: wrap(
      p("Use this code to recover your downloads of <em>The First Resident of Briar Glen</em>:") +
        `<p style="margin:24px 0;font-family:Arial,sans-serif;font-size:32px;letter-spacing:0.3em;color:#f3ead8;"><strong>${escapeHtml(code)}</strong></p>` +
        p("The code expires in 10 minutes and can be used once.") +
        p("If you did not ask for this code, you can ignore this email. Nobody can use it without also knowing your purchase details.")
    ),
    text: [
      "Use this code to recover your downloads of The First Resident of Briar Glen:",
      "",
      code,
      "",
      "The code expires in 10 minutes and can be used once.",
      "If you did not ask for this code, you can ignore this email.",
      "",
      "Partner54 Digital",
      "Publisher of The First Resident of Briar Glen",
    ].join("\n"),
  };
}
