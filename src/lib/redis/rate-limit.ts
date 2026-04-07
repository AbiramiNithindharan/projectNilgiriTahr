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
