const rateLimitMap = new Map<string, { count: number; time: number }>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60000) {
  const now = Date.now();

  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, time: now });
    return true;
  }

  if (now - record.time > windowMs) {
    rateLimitMap.set(ip, { count: 1, time: now });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}
