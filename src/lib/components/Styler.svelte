<script lang="ts">
  // @ts-nocheck
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

<div class = "h-full overflow-y-scroll flex-grow flex flex-col px-5">
  {#key selectedStyle}
  {#each styleUIConfigurations as styleUIData, i}
    <div class="ceneter my-2 flex items-center">
      <p class="mr-7">{styleUIData.name}</p>

      {#if styleUIData.type == UITypeEnums.DROPDOWN}
        <select
          class="select-bordered select max-w-xs"
          bind:value={$data.styles[selectedStyle][styleUIData.forId]}
        >
          {#each styleUIConfigurations[i].data as arrDat, j}
            <option value={arrDat.value}>{arrDat.label}</option>
          {/each}
        </select>
      {:else if styleUIData.type == UITypeEnums.COLOR_PICKER}
        <ColorPicker
          bind:rgb={$data.styles[selectedStyle][styleUIData.forId]}
          
        />
        <!-- on:input={(event)=>{
            // $data.styles[selectedStyle][styleUIData.forId]
            let newData = $data;

            newData.styles[selectedStyle][styleUIData.forId].r = event.detail.rgb.r;
            newData.styles[selectedStyle][styleUIData.forId].g = event.detail.rgb.g;
            newData.styles[selectedStyle][styleUIData.forId].b = event.detail.rgb.b;
            newData.styles[selectedStyle][styleUIData.forId].a = event.detail.rgb.a;
            
            data.set(newData);
          }} -->
      {:else if styleUIData.type == UITypeEnums.SLIDER}
        <input
          type="range"
          min={styleUIData.data.start}
          max={styleUIData.data.end}
          class="range"
          bind:value={$data.styles[selectedStyle][styleUIData.forId]}
        />
      {:else if styleUIData.type == UITypeEnums.TOGGLE}
        <!-- @ts-ignore -->
        <input
          type="checkbox"
          class="toggle"
          bind:checked={$data.styles[selectedStyle][styleUIData.forId]}
        />
      {/if}
    </div>
  {/each}
{/key}

<div class="w-full min-h-12 mt-auto rounded-t-lg p-4 text-center bg-base-300 tooltip" data-tip="This is not an exact representation of how it will look. Double check when putting it on youtube on diffrent devices to see how it actually looks.">
  The quick brown fox jumps over the lazy dog
</div>

</div>