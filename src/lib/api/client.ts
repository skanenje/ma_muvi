export async function safeFetch(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(url, options);

    if (res.status === 429) {
      throw new Error('Rate limit exceeded. Please wait and try again.');
    }

    if (!res.ok) {
      const message = `API error ${res.status}: ${res.statusText}`;
      throw new Error(message);
    }

    return await res.json();
  } catch (err) {
    console.error('API fetch error:', err);
    throw err; // bubble up to UI
  }
}