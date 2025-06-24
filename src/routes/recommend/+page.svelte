<script lang="ts">
    import { watchlist } from '$lib/stores/watchlist';
    import { onMount } from 'svelte';
    import { discoverMoviesByGenre } from '$lib/api/tmdb';
  
    let recommendations: { id: number; title: string; poster_path: string }[] = [];
    let loading = true;
  
    onMount(async () => {
      const items = $watchlist;
  
      // Count genre frequency
      const genreCount: Record<number, number> = {};
      for (const item of items) {
        item.genre_ids?.forEach((id) => {
          genreCount[id] = (genreCount[id] || 0) + 1;
        });
      }
  
      const topGenres = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([id]) => Number(id));
  
      if (topGenres.length > 0) {
        const dataPromises = topGenres.map((genre) => discoverMoviesByGenre(genre));
        const dataResults = await Promise.all(dataPromises) as { results: { id: number; title: string; poster_path: string }[] }[];
        recommendations = dataResults.flatMap((data) => data.results);
      }
  
      loading = false;
    });
  </script>
  
  <h2 class="text-white text-xl mb-4">🎯 Recommendations Based on Your Watchlist</h2>
  
  {#if loading}
    <p class="text-purple-300">Loading recommendations...</p>
  {:else if recommendations.length === 0}
    <p class="text-purple-300">Add items to your watchlist to get recommendations.</p>
  {:else}
    <div class="trending-movies">
      {#each recommendations as movie}
        <a href={`/movie/${movie.id}`} class="movie-card-link">
          <div class="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              class="movie-poster"
            />
            <div class="movie-info">
              {movie.title}
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
  