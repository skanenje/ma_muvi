<script lang="ts">
    import { watchlist } from '$lib/stores/watchlist';
  
    $: items = $watchlist;
  </script>
  
  <style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
  .card {
    background-color: #4c1d95;
    border-radius: 0.75rem;
    overflow: hidden;
  }
  .poster {
    width: 100%;
    object-fit: cover;
  }
  .info {
    padding: 0.5rem;
    color: white;
  }
  .watched {
    font-size: 0.8rem;
    color: #a3e635;
  }
  </style>
  
  <h2 class="text-white text-xl mb-4">🎬 Your Watchlist</h2>
  
  {#if items.length === 0}
    <p class="text-purple-300">No items in your watchlist yet.</p>
  {:else}
    <div class="grid">
      {#each items as item}
        <a href={`/${item.type}/${item.id}`}>
          <div class="card">
            <img
              class="poster"
              src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/fallback.jpg'}
              alt={item.title}
            />
            <div class="info">
              <div>{item.title}</div>
              {#if item.watched}
                <div class="watched">✓ Watched</div>
              {/if}
            </div>
          </div>
        </a>
      {/each}
    </div>
    <div class="mt-6">
      <a href="/recommend">
        <button class="button">
          🎯 Get Recommendations
        </button>
      </a>
    </div>
  {/if}
  