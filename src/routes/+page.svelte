<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import TrendingMovies from '$lib/components/TrendingMovies.svelte';
  import SearchResults from '$lib/components/SearchResults.svelte';
  import { searchMovies } from '$lib/api/tmdb';

  let searchResults: any[] = [];
  let isSearching = false;

  async function handleSearch(query: string) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      searchResults = [];
      isSearching = false;
      return;
    }

    try {
      isSearching = true;
      const res = await searchMovies(trimmedQuery);
      console.log('Search Results:', res);
      if (res && typeof res === 'object' && 'results' in res && Array.isArray((res as any).results)) {
        searchResults = (res as { results: any[] }).results;
      } else {
        searchResults = [];
      }
    } catch (err) {
      let errorMessage = 'Unknown error';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert('Search failed: ' + errorMessage);
    } finally {
      isSearching = false;
    }
  }
</script>

<Hero onSearch={handleSearch} />

{#if isSearching}
  <p class="text-center text-purple-300 mt-6">Searching...</p>
{:else if searchResults.length > 0}
  <SearchResults results={searchResults} />
{:else}
  <section class="px-6 mt-10">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-300">
      <span>📈</span> Trending Movies
    </h2>
    <TrendingMovies />
  </section>
{/if}
