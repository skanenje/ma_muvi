// src/lib/api/tmdb.ts
import { apiFetch } from './client';

const BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 


export async function searchMovies(query: string, page = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!res.ok) throw new Error('Failed to fetch search results');
  return res.json(); // includes `results`, `total_pages`, `page`
}


export function searchTVShows(query: string, page = 1) {
	return apiFetch(`${BASE}/search/tv?query=${encodeURIComponent(query)}&page=${page}&api_key=${API_KEY}`);
}

export function getMovieDetails(id: string) {
	return apiFetch(`${BASE}/movie/${id}?api_key=${API_KEY}`);
}

export function getTVDetails(id: string) {
	return apiFetch(`${BASE}/tv/${id}?api_key=${API_KEY}`);
}

export function getTrending(mediaType: 'movie' | 'tv' = 'movie') {
	return apiFetch(`${BASE}/trending/${mediaType}/day?api_key=${API_KEY}`);
}

export function getGenres(mediaType: 'movie' | 'tv' = 'movie') {
	return apiFetch(`${BASE}/genre/${mediaType}/list?api_key=${API_KEY}`);
}
export function discoverMoviesByGenre(genreId: number, page = 1) {
  return apiFetch(`${BASE}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`);
}
export async function searchMulti(query: string, page = 1) {
  const res = await fetch(
    `${BASE}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch search results');
  }

  return res.json(); // includes total_pages, total_results
}
