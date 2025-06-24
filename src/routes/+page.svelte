<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import SearchResults from '$lib/components/SearchResults.svelte';
  import TrendingMovies from '$lib/components/TrendingMovies.svelte';
  import GenreFilter from '$lib/components/GenreFilter.svelte';

  import { searchMovies, discoverMoviesByGenre } from '$lib/api/tmdb';

  let searchResults: any[] = [];
  let genreResults: any[] = [];
  let selectedGenreId = 0;
  let isSearching = false;
  let isGenreLoading = false;

  async function handleSearch(query: string) {
    query = query.trim();
    selectedGenreId = 0; // Clear genre if search is happening

    if (!query) {
      searchResults = [];
      return;
    }

    isSearching = true;
    try {
      const res = await searchMovies(query);
      if (res && typeof res === 'object' && 'results' in res && Array.isArray((res as any).results)) {
        searchResults = (res as { results: any[] }).results;
      } else {
        searchResults = [];
      }
    } catch (err) {
      console.error(err);
    } finally {
      isSearching = false;
    }
  }

  async function handleGenreSelect(id: number) {
    searchResults = []; // Clear search results if genre is selected
    genreResults = [];

    if (id === 0) return;

    isGenreLoading = true;
    try {
      const res = await discoverMoviesByGenre(id);
      if (res && typeof res === 'object' && 'results' in res && Array.isArray((res as any).results)) {
        genreResults = (res as { results: any[] }).results;
      } else {
        genreResults = [];
      }
    } catch (err) {
      console.error(err);
    } finally {
      isGenreLoading = false;
    }
  }
</script>

<Hero onSearch={handleSearch} />
<GenreFilter {selectedGenreId} onSelect={handleGenreSelect} />

{#if isSearching}
  <p class="text-center text-purple-300 mt-6">Searching...</p>
{:else if searchResults.length > 0}
  <SearchResults results={searchResults} />
{:else if isGenreLoading}
  <p class="text-center text-purple-300 mt-6">Loading genre movies...</p>
{:else if genreResults.length > 0}
  <SearchResults results={genreResults} />
{:else}
  <section class="px-6 mt-10">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-300">
      <span>📈</span> Trending Movies
    </h2>
    <TrendingMovies />
  </section>
{/if}
