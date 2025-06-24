import { getTVDetails } from '$lib/api/tmdb';

export async function load({ params }) {
  const movieId = params.id;
  const details = await getTVDetails(movieId);

  return { details };
}
