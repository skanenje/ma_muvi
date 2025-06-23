// Handles common fetch logic and error handling.
export async function apiFetch<T>(url: string): Promise<T> {
	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`API error: ${res.status}`);
		return await res.json();
	} catch (error) {
		console.error('API Fetch Failed:', error);
		throw error;
	}
}
