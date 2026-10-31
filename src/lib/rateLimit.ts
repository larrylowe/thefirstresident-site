/**
 * Failed-attempt limiter per client IP for the recovery endpoints.
 * In-memory, so it is per server instance: it slows guessing rather than
 * guaranteeing a global limit. Per-purchase limits on email codes are
 * enforced durably in the download record (lib/recoveryCodes).
 */

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; resetAt: number }>();

export const RATE_LIMIT_MESSAGE =
  "Too many attempts. Please wait 15 minutes and try again, or contact support@thefirstresident.com.";

export function clientKey(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

export function isRateLimited(key: string): boolean {
  const entry = failures.get(key);
  if (!entry) return false;
  if (Date.now() > entry.resetAt) {
    failures.delete(key);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

export function recordFailure(key: string) {
  const entry = failures.get(key);
  if (!entry || Date.now() > entry.resetAt) {
    failures.set(key, { count: 1, resetAt: Date.now() + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}
