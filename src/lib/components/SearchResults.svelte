<script lang="ts">
  export let results: any[] = [];

  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
</script>

{#if results.length === 0}
  <p class="text-center text-purple-300 mt-6">No results found.</p>
{:else}
  <div class="results-grid">
    {#each results as movie}
      <div class="movie-card">
        <img
          class="movie-poster"
          src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : '/fallback.jpg'}
          alt={movie.title}
        />
        <div class="movie-info">
          <div>{movie.title}</div>
          <div class="opacity-70 text-sm">{movie.release_date}</div>
        </div>
      </div>
    {/each}
  </div>
{/if}
