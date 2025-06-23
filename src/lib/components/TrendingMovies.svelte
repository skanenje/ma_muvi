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
      <div class="trending-movie-card">
        <img
          class="trending-movie-poster"
          src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : '/fallback.jpg'}
          alt={movie.title}
        />
        <div class="trending-movie-info">
          <div class="truncate">{movie.title}</div>
          <div class="opacity-70">{movie.release_date}</div>
        </div>
      </div>
    {/each}
  </div>
{/if}
