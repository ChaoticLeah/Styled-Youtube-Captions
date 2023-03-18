<script lang="ts">
  import {
    baseStyle,
    styleUIConfigurations,
    UITypeEnums,
    data,
  } from "$lib/captionDataManager";
  import ColorPicker from "svelte-awesome-color-picker";

  let selectedStyle: number;

  data.subscribe((value) => {

    selectedStyle = value.selectedStyleIndex;
  });

</script>

{selectedStyle}

{#each styleUIConfigurations as styleUIData, i}
  <div class="ceneter my-4 flex items-center">
    <p class="mr-7">{styleUIData.name}</p>

    {#if styleUIData.type == UITypeEnums.DROPDOWN}
      <select class="select-bordered select max-w-xs">
        {#each styleUIConfigurations[i].data as arrDat, j}
          <option value={arrDat.value}>{arrDat.label}</option>
        {/each}
      </select>
    {:else if styleUIData.type == UITypeEnums.COLOR_PICKER}
      <ColorPicker />
    {:else if styleUIData.type == UITypeEnums.SLIDER}
      <input
        type="range"
        min={styleUIData.data.start}
        max={styleUIData.data.end}
        value="40"
        class="range"
      />
    {:else if styleUIData.type == UITypeEnums.TOGGLE}
      <input
        type="checkbox"
        class="toggle"
        bind:checked={$data.styles[selectedStyle][styleUIData.forId]}
      />
      <!-- bind:checked={} -->
    {/if}
  </div>
{/each}
