const cache = new Map<string, any>();

export function getCached(url: string): any | undefined {
  return cache.get(url);
}

export function setCached(url: string, data: any): void {
  cache.set(url, data);

  // Optional: keep cache size under 100
  if (cache.size > 100) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey !== undefined) {
      cache.delete(oldestKey);
    }
  }
}
