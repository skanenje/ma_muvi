<script lang="ts">
  export let results: any[] = [];

  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
</script>

{#if results.length === 0}
  <p class="text-center text-purple-300 mt-6">No results found.</p>
{:else}
  <div class="results-grid">
{#each results as movie}
  <a href={`/movie/${movie.id}`} class="movie-card-link">
    <div class="movie-card">
      <img
        class="movie-poster"
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/fallback.jpg'}
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
