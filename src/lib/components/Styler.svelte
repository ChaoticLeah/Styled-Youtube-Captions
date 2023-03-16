<script lang="ts">
  import { baseStyle, styleUIConfigurations, UITypeEnums } from "$lib/captionDataManager";
  import ColorPicker from "svelte-awesome-color-picker";
</script>

{#each styleUIConfigurations as data, i}
  <div class="ceneter my-4 flex items-center">
    <p class="mr-7">{data.name}</p>

    {#if data.type == UITypeEnums.DROPDOWN}

    <select class="select-bordered select max-w-xs">
        {#each styleUIConfigurations[i].data as arrDat, j}
          <option value={arrDat.value}>{arrDat.label}</option>
        {/each}
      </select>
    {:else if data.type == UITypeEnums.COLOR_PICKER}
      <ColorPicker />
    {:else if data.type == UITypeEnums.SLIDER}
      <input
        type="range"
        min={data.data.start}
        max={data.data.end}
        value="40"
        class="range"
      />
    {:else if data.type == UITypeEnums.TOGGLE}
      <input type="checkbox" class="toggle" checked={baseStyle[data.forId]}  />
      <!-- bind:checked={} -->
    {/if}
  </div>
{/each}
