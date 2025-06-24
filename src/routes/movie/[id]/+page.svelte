<script lang="ts">
  import MediaDetail from '$lib/components/MediaDetail.svelte';
  export let data: { details: any };
</script>

<MediaDetail media={data.details} omdb={data.details.omdb} />
