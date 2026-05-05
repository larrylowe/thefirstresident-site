/**
 * archiveAccess.ts
 *
 * Utilities for signing and verifying the briar_glen_archive_access cookie.
 * Uses HMAC-SHA256 via the Node.js crypto module so there is no extra
 * dependency.  The signed token format is:
 *
 *   <payload_base64url>.<hmac_hex>
 *
 * where payload is JSON: { granted: true, iat: <unix_seconds> }
 */

import { createHmac, timingSafeEqual } from "crypto";

export const ARCHIVE_COOKIE_NAME = "briar_glen_archive_access";

// maxAge in seconds — 270 days (between the 180 and 365 day spec window)
export const ARCHIVE_COOKIE_MAX_AGE = 270 * 24 * 60 * 60;

function getSecret(): string {
  const secret = process.env.ARCHIVE_ACCESS_SECRET;
  if (!secret) {
    throw new Error(
      "ARCHIVE_ACCESS_SECRET environment variable is not set. " +
        "Add it to .env.local (development) and your Vercel project " +
        "environment variables (production) before using Archive access."
    );
  }
  return secret;
}

function toBase64Url(input: string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Create a signed archive access token string. */
export function createArchiveToken(): string {
  const secret = getSecret();
  const payload = toBase64Url(
    JSON.stringify({ granted: true, iat: Math.floor(Date.now() / 1000) })
  );
  const mac = sign(payload, secret);
  return `${payload}.${mac}`;
}

/** Return true if the token is structurally valid and the HMAC matches. */
export function verifyArchiveToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const secret = getSecret();
    const dot = token.lastIndexOf(".");
    if (dot < 1) return false;
    const payload = token.slice(0, dot);
    const mac = token.slice(dot + 1);
    const expected = sign(payload, secret);
    // Constant-time comparison to prevent timing attacks
    const macBuf = Buffer.from(mac, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (macBuf.length !== expBuf.length) return false;
    return timingSafeEqual(macBuf, expBuf);
  } catch {
    return false;
  }
}

/** Build the Set-Cookie header value for the archive access cookie. */
export function buildArchiveCookieHeader(token: string): string {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${ARCHIVE_COOKIE_NAME}=${token}`,
    `Path=/`,
    `Max-Age=${ARCHIVE_COOKIE_MAX_AGE}`,
    `SameSite=Lax`,
    `HttpOnly`,
  ];
  if (isProd) parts.push("Secure");
  return parts.join("; ");
}
