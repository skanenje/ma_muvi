import { apiFetch } from './client';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; 

export function getOMDBDetails(imdbId: string) {
	return apiFetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`);
}