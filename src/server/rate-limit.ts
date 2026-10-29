// In-memory sliding window. Good enough for one process; replaced by a database-backed
// limiter when the database module lands.
const hits = new Map<string, number[]>();

export function allow(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function resetRateLimits(): void {
  hits.clear();
}
