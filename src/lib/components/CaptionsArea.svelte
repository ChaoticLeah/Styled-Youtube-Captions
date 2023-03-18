<script lang="ts">
    import { data } from "$lib/captionDataManager";
    import CaptionChunkHolder from "./CaptionChunkHolder.svelte";
    import FieldAdder from "./FieldAdder.svelte";

</script>

<FieldAdder id={-1} bind:captionsData={$data.captions}></FieldAdder>

{#each $data.captions as captionData, i}
  <CaptionChunkHolder id={i} bind:captionsData={$data.captions} />
  <FieldAdder id={i} bind:captionsData={$data.captions}></FieldAdder>
{/each}