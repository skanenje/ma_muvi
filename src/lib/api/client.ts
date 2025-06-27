import { getCached, setCached } from './cache';

export async function safeFetch(url: string, options: RequestInit = {}) {
  const cached = getCached(url);
  if (cached) {
    console.log('✅ Cache hit for:', url);
    return cached;
  }

  try {
    const res = await fetch(url, options);

    if (res.status === 429) {
      throw new Error('Rate limit exceeded. Please wait and try again.');
    }

    if (!res.ok) {
      const message = `API error ${res.status}: ${res.statusText}`;
      throw new Error(message);
    }

    const json = await res.json();
    setCached(url, json);
    return json;
  } catch (err) {
    console.error('API fetch error:', err);
    throw err;
  }
}
