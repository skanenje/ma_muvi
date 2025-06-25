// src/lib/api/tmdb.ts
import { safeFetch } from './client';

const BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

export async function searchMovies(query: string, page = 1) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
  return safeFetch(url);
}

export async function discoverMoviesByGenre(genreId: number, page = 1) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`;
  return safeFetch(url);
}


export function getMovieDetails(id: string) {
  const url = `${BASE}/movie/${id}?api_key=${API_KEY}`;
  return safeFetch(url);
}

export function getTVDetails(id: string) {
  const url = `${BASE}/tv/${id}?api_key=${API_KEY}`;
  return safeFetch(url);
}

export function getTrending(mediaType: 'movie' | 'tv' = 'movie') {
  const url = `${BASE}/trending/${mediaType}/day?api_key=${API_KEY}`;
  return safeFetch(url);
}

export function getGenres(mediaType: 'movie' | 'tv' = 'movie') {
  const url = `${BASE}/genre/${mediaType}/list?api_key=${API_KEY}`;
  return safeFetch(url);
}

export async function searchMulti(query: string, page = 1) {
  const res = await safeFetch(
    `${BASE}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch search results');
  }

  return res.json(); // includes total_pages, total_results
}
