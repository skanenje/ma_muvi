<script lang="ts">
  import { tick } from 'svelte';

  export let onSearch: (query: string) => void;
  let query = '';
  let timeout: ReturnType<typeof setTimeout>;

  function onInput(e: Event) {
    clearTimeout(timeout);
    query = (e.target as HTMLInputElement).value;
    timeout = setTimeout(() => {
      onSearch(query);
    }, 500); // debounce delay
  }

  function onSubmit() {
    clearTimeout(timeout);
    onSearch(query);
  }
</script>

<form class="search-container" on:submit|preventDefault={onSubmit}>
  <input
    class="search-input"
    type="text"
    placeholder="Search for movies..."
    on:input={onInput}
  />
  <!-- <button class="search-button" type="submit">Search</button> -->
</form>
