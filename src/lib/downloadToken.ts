/**
 * Short-lived download token using HMAC-SHA256.
 *
 * Format: base64url(payload).base64url(hmac)
 * Payload: { sessionId, priceId, exp }
 * Lifetime: 10 minutes (TOKEN_TTL_SECONDS)
 */

import crypto from "crypto";

const TOKEN_TTL_SECONDS = 10 * 60; // 10 minutes

interface TokenPayload {
  sessionId: string;
  priceId: string;
  exp: number; // Unix timestamp seconds
}

function getSecret(): string {
  const s = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!s) throw new Error("DOWNLOAD_TOKEN_SECRET is not set");
  return s;
}

export function createDownloadToken(sessionId: string, priceId: string): string {
  const payload: TokenPayload = {
    sessionId,
    priceId,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${sig}`;
}

export function verifyDownloadToken(token: string): TokenPayload {
  // Split on the last dot so the payload itself can contain dots
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) throw new Error("Invalid token format");

  const payloadB64 = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);

  if (!payloadB64 || !sig) throw new Error("Invalid token format");

  const expectedSig = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (
    sigBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expectedBuf)
  ) {
    throw new Error("Invalid token signature");
  }

  const payload: TokenPayload = JSON.parse(
    Buffer.from(payloadB64, "base64url").toString()
  );

  if (Math.floor(Date.now() / 1000) > payload.exp) {
    throw new Error("Token expired");
  }

  return payload;
}
