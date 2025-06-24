import { getMovieDetails } from '$lib/api/tmdb';

export async function load({ params }) {
  const movieId = params.id;
  const details = await getMovieDetails(movieId);

  return { details };
}
