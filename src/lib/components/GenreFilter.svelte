<!-- src/lib/components/GenreFilter.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { getGenres } from '$lib/api/tmdb';

  export let selectedGenreId: number = 0;
  export let onSelect: (genreId: number) => void;

  let genres: { id: number; name: string }[] = [];

  onMount(async () => {
    const res = await getGenres();
    genres = (res as { genres: { id: number; name: string }[] }).genres;
  });

  function handleSelect(e: Event) {
    const value = parseInt((e.target as HTMLSelectElement).value);
    selectedGenreId = value;
    onSelect(value);
  }
</script>

<style>
.genre-dropdown {
  padding: 0.5rem 1rem;
  background-color: #6b21a8;
  color: white;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
</style>

<div class="text-center mt-6">
  <select class="genre-dropdown" on:change={handleSelect}>
    <option value="0" selected={selectedGenreId === 0}>Browse by Genre</option>
    {#each genres as genre}
      <option value={genre.id} selected={selectedGenreId === genre.id}>{genre.name}</option>
    {/each}
  </select>
</div>
