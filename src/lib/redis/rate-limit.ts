import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const loginRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  // 5 requests per 10 seconds
});

export const apiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"),
  // 60 requests per minute
});

export const contactRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"),
});

export const volunteerRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"),
});

/**
 * Runs a rate limiter, failing open if Redis is unreachable.
 *
 * A dead or deleted Upstash database would otherwise throw and 500 the route,
 * taking down admin login and the public contact/volunteer forms. Availability
 * wins here: the request is allowed through and the failure is logged loudly so
 * the outage is still visible. Note that while Redis is down there is no
 * brute-force protection — the honeypot and validators are the only guard left
 * on public forms.
 */
export async function safeLimit(limiter: Ratelimit, identifier: string) {
  try {
    return await limiter.limit(identifier);
  } catch (err) {
    console.error("⚠️ Rate limiter unavailable, allowing request:", err);
    return { success: true };
  }
}
