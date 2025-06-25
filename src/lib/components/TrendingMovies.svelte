<script lang="ts">
  import { onMount } from 'svelte';
  import { getTrending } from '$lib/api/tmdb';

  let movies: any[] = [];
  let loading = true;
  let error = '';

  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

  onMount(async () => {
    try {
      const res = await getTrending('movie') as { results: any[] };
      movies = res.results;
    } catch (err) {
      error = 'Failed to load trending movies.';
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="trending-movies">
    {#each Array(10) as _}
      <div class="trending-movie-card"></div>
    {/each}
  </div>
{:else if error}
  <p class="text-red">{error}</p>
{:else}
  <div class="trending-movies">
{#each movies as movie}
  <a href={`/movie/${movie.id}`} class="movie-card-link">
    <div class="movie-card">
      <img
        class="movie-poster"
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'static/fallback.jpg'}
        alt={movie.title}
      />
      <div class="movie-info">
        <div>{movie.title}</div>
        <div>{movie.release_date}</div>
      </div>
    </div>
  </a>
{/each}

  </div>
{/if}
