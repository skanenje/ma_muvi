<!-- src/lib/components/MediaDetail.svelte -->
<script lang="ts">
  export let media: any;

  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
</script>

<style>
.media-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  color: white;
  max-width: 1000px;
  margin: auto;
}

.media-poster {
  width: 100%;
  max-width: 300px;
  border-radius: 1rem;
}

.media-content {
  flex: 1;
}

.media-title {
  font-size: 2rem;
  font-weight: bold;
}

.media-sub {
  color: #c084fc;
  font-size: 1rem;
}

.media-overview {
  margin-top: 1rem;
  line-height: 1.6;
}
</style>

<div class="media-detail">
  <img
    class="media-poster"
    src={media.poster_path ? `${IMAGE_BASE}${media.poster_path}` : '/fallback.jpg'}
    alt={media.title}
  />

  <div class="media-content">
    <div class="media-title">{media.title || media.name}</div>
    <div class="media-sub">
      {media.release_date || media.first_air_date} • Rating: {media.vote_average}
    </div>

    <div class="media-overview">{media.overview}</div>

    {#if media.genres}
      <div class="mt-4">
        <strong>Genres:</strong>
        {#each media.genres as genre}
          <span class="inline-block bg-purple-600 rounded-full px-3 py-1 text-sm mr-2">{genre.name}</span>
        {/each}
      </div>
    {/if}
  </div>
</div>
