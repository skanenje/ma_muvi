// src/lib/api/tmdb.ts
import { apiFetch } from './client';

const BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

