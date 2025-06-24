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

  let currentPage = 1;
  let totalPages = 1;
  let activeQuery = '';

  let currentGenrePage = 1;
  let totalGenrePages = 1;

  async function handleSearch(query: string, page = 1) {
    query = query.trim();
    selectedGenreId = 0;
    activeQuery = query;

    if (!query) {
      searchResults = [];
      totalPages = 1;
      currentPage = 1;
      return;
    }

    isSearching = true;
    try {
      const res = await searchMovies(query, page);
      if (res && Array.isArray(res.results)) {
        searchResults = res.results;
        totalPages = res.total_pages;
        currentPage = res.page;
      } else {
        searchResults = [];
      }
    } catch (err) {
      console.error(err);
    } finally {
      isSearching = false;
    }
  }

  async function handleGenreSelect(id: number, page = 1) {
  searchResults = [];
  genreResults = [];

  if (id === 0) return;

  selectedGenreId = id;
  currentGenrePage = page;

  isGenreLoading = true;
  try {
    const res = await discoverMoviesByGenre(id, page) as { results: any[]; total_pages: number };
    if (res && Array.isArray(res.results)) {
      genreResults = res.results;
      totalGenrePages = res.total_pages;
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
  <div class="pagination">
    <button disabled={currentPage === 1} on:click={() => handleSearch(activeQuery, currentPage - 1)}>
      ⬅ Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button disabled={currentPage === totalPages} on:click={() => handleSearch(activeQuery, currentPage + 1)}>
      Next ➡
    </button>
  </div>
{:else if isGenreLoading}
  <p class="text-center text-purple-300 mt-6">Loading genre movies...</p>
{:else if genreResults.length > 0}
  <SearchResults results={genreResults} />
  <div class="pagination">
  <button disabled={currentGenrePage === 1} on:click={() => handleGenreSelect(selectedGenreId, currentGenrePage - 1)}>
    ⬅ Previous
  </button>
  <span>Page {currentGenrePage} of {totalGenrePages}</span>
  <button disabled={currentGenrePage === totalGenrePages} on:click={() => handleGenreSelect(selectedGenreId, currentGenrePage + 1)}>
    Next ➡
  </button>
</div>
{:else}
  <section class="px-6 mt-10">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-300">
      <span>📈</span> Trending Movies
    </h2>
    <TrendingMovies />
  </section>
{/if}