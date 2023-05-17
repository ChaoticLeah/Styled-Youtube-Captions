<script lang="ts">
  // @ts-nocheck
  import {
    EditorInputTypes,
    EditorUITypes,
    data,
  } from "$lib/captionDataManager";
  import ColorPickerWrapper from "./ColorPickerWrapper.svelte";

  let selectedStyle: number;
  data.subscribe((value) => {
    selectedStyle = value.selectedStyleIndex;
  });
</script>

<div class="flex h-full flex-grow flex-col overflow-y-scroll">
  {#each Object.entries($data.styles[selectedStyle]) as [editorStyleId, value]}
    <div class="ceneter my-2 flex items-center">
      <!-- <p class="mr-7">{EditorUITypes[editorStyleId]}</p> -->
    </div>

    <!-- TODO make it translate to whatever language you selected and use this as the id -->
    <p class="mr-7">{editorStyleId}</p>

    {#if EditorUITypes[editorStyleId].type == EditorInputTypes.BOOLEAN}
      <!-- @ts-ignore -->
      <input
        type="checkbox"
        class="toggle"
        bind:checked={$data.styles[selectedStyle][editorStyleId]}
      />
    {:else if EditorUITypes[editorStyleId].type == EditorInputTypes.LONG_TEXT}
      <textarea
        class="textarea-bordered textarea"
        bind:value={$data.styles[selectedStyle][editorStyleId]}
      />
    {:else if EditorUITypes[editorStyleId].type == EditorInputTypes.NUMBER}
      <div class="my-2 flex items-center">
        <input
          type="number"
          min={EditorUITypes[editorStyleId].data.start}
          max={EditorUITypes[editorStyleId].data.end}
          class="input-bordered input mr-2 w-20"
          bind:value={$data.styles[selectedStyle][editorStyleId]}
        />

        <input
          type="range"
          min={EditorUITypes[editorStyleId].data.start}
          max={EditorUITypes[editorStyleId].data.end}
          class="range"
          bind:value={$data.styles[selectedStyle][editorStyleId]}
        />
      </div>
    {:else if EditorUITypes[editorStyleId].type == EditorInputTypes.SELECT}
      <select
        class="select-bordered select block"
        bind:value={$data.styles[selectedStyle][editorStyleId]}
      >
        {#each EditorUITypes[editorStyleId].data as arrDat, j}
          <option value={arrDat.value}>{arrDat.label}</option>
        {/each}
      </select>
    {:else if EditorUITypes[editorStyleId].type == EditorInputTypes.COLOR_WITHOUT_ALPHA}
      <ColorPickerWrapper
        bind:hex={$data.styles[selectedStyle][editorStyleId]}
        alphaEnabled={false}
      />
    {:else if EditorUITypes[editorStyleId].type == EditorInputTypes.COLOR_WITH_ALPHA}
      <ColorPickerWrapper
        bind:hex={$data.styles[selectedStyle][editorStyleId]}
        alphaEnabled={true}
      />
    {/if}
  {/each}

  <div class="block">
    <div class="flex justify-center">
      <button class="btn-outline btn-circle btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  </div>
  <!-- TODO: Make it so you can add these styling options and get rid of them -->
</div>
