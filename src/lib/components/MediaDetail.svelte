<script lang="ts">
  import { watchlist } from '$lib/stores/watchlist';
  import { get } from 'svelte/store';

  // props from parent
  export let media: any;
  export let omdb: any;
  export let mediaType: 'movie' | 'tv' = 'movie';

  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

  // local state
  let isInWatchlist = false;
  let isWatched = false;

  $: {
    const current = get(watchlist);
    const match = current.find((i) => i.id === media.id && i.type === mediaType);
    isInWatchlist = !!match;
    isWatched = match?.watched || false;
  }

  function handleAdd() {
    watchlist.add({
      id: media.id,
      type: mediaType,
      title: media.title || media.name,
      poster_path: media.poster_path,
      watched: false
    });
  }

  function handleRemove() {
    watchlist.remove(media.id, mediaType);
  }

  function toggleWatched() {
    watchlist.toggleWatched(media.id, mediaType);
  }

  function extractRatings(omdb: any) {
    let imdb = null;
    let rt = null;

    if (omdb?.Ratings) {
      for (const r of omdb.Ratings) {
        if (r.Source === 'Internet Movie Database') imdb = r.Value;
        if (r.Source === 'Rotten Tomatoes') rt = r.Value;
      }
    }
    return { imdb, rt };
  }

  const { imdb, rt } = extractRatings(omdb);
</script>


<div class="media-detail">
  <img
    class="media-poster"
    src={media.poster_path ? `${IMAGE_BASE}${media.poster_path}` : '/fallback.jpg'}
    alt={media.title}
  />

  <div class="media-content">
    <div class="media-title">{media.title || media.name}</div>
    <div class="media-sub">
      {media.release_date || media.first_air_date} • 
      TMDB: {media.vote_average}
      {#if imdb} • IMDb: {imdb} {/if}
      {#if rt} • 🍅 RT: {rt} {/if}
    </div>

    <div class="media-overview">{media.overview}</div>

    {#if media.genres}
      <div class="mt-4">
        <strong>Genres:</strong>
        {#each media.genres as genre}
          <span class="genre-pill">{genre.name}</span>
        {/each}
      </div>
    {/if}

    <!-- Watchlist Actions -->
    {#if isInWatchlist}
      <button class="button" on:click={handleRemove}>Remove from Watchlist</button>
      <button class="button secondary" on:click={toggleWatched}>
        {isWatched ? 'Mark as Unwatched' : 'Mark as Watched'}
      </button>
    {:else}
      <button class="button" on:click={handleAdd}>Add to Watchlist</button>
    {/if}
  </div>
</div>
