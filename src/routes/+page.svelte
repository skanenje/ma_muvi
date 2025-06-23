<script>
  import Hero from '$lib/components/Hero.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import TrendingMovies from '$lib/components/TrendingMovies.svelte';
</script>


<Navbar />
<Hero />
<section class="mt-10">
  <h2>
    <span>📈</span> Trending Movies
  </h2>
  <TrendingMovies />
</section>
