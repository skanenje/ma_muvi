<script lang="ts">
  import SearchBar from './SearchBar.svelte';

  export let onSearch: (query: string) => void;

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    } else {
      console.warn('onSearch handler not provided');
    }
  };
</script>

<section class="hero">
  <h1>Discover Your Next<br />Favorite Movie</h1>
  <p>
    Explore trending movies, build your watchlist, and never miss out on the latest entertainment.
  </p>
  <SearchBar onSearch={handleSearch} />
</section>
