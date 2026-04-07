type RateLimitEntry = {
  count: number;
  lastRequest: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // max attempts per window

export function rateLimit(identifier: string) {
  const now = Date.now();

  const entry = rateLimitMap.get(identifier);

  if (!entry) {
    rateLimitMap.set(identifier, {
      count: 1,
      lastRequest: now,
    });
    return { allowed: true };
  }

  // reset window
  if (now - entry.lastRequest > WINDOW_SIZE) {
    rateLimitMap.set(identifier, {
      count: 1,
      lastRequest: now,
    });
    return { allowed: true };
  }

  // increment
  entry.count++;

  if (entry.count > MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((WINDOW_SIZE - (now - entry.lastRequest)) / 1000),
    };
  }

  return { allowed: true };
}
