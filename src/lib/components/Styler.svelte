<script lang="ts">
  // @ts-nocheck
  import {
    styleUILinkerConfigerations,
    UITypeEnums,
    data,
  } from "$lib/captionDataManager";
  import ColorPicker from "svelte-awesome-color-picker";
  import ColorPickerWrapper from "./ColorPickerWrapper.svelte";

  let selectedStyle: number;

  data.subscribe((value) => {
    selectedStyle = value.selectedStyleIndex;
  });
</script>

<div class="flex h-full flex-grow flex-col overflow-y-scroll px-5">
  {#key selectedStyle}
    {#each styleUILinkerConfigerations as styleUIData, i}
      <div class="ceneter my-2 flex items-center">
        <p class="mr-7">{styleUIData.name}</p>

        {#if styleUIData.type == UITypeEnums.DROPDOWN}
          <select
            class="select-bordered select max-w-xs"
            bind:value={$data.styles[selectedStyle][
              styleUIData.styleData[0].forId
            ]}
          >
            {#each styleUILinkerConfigerations[i].styleData[0].data as arrDat, j}
              <option value={arrDat.value}>{arrDat.label}</option>
            {/each}
          </select>
        {:else if styleUIData.type == UITypeEnums.COLOR_PICKER}
          {#if styleUIData.styleData[1] != undefined}
            <ColorPickerWrapper
              hex={$data.styles[selectedStyle][styleUIData.styleData[0].forId]}
              alpha={$data.styles[selectedStyle][
                styleUIData.styleData[1].forId
              ]}
              alphaEnabled={true}
              on:colorChange={(event) => {
                $data.styles[selectedStyle][styleUIData.styleData[0].forId] =
                  event.detail.hex;
                $data.styles[selectedStyle][styleUIData.styleData[1].forId] =
                  event.detail.alpha;
                console.log(event.detail.alpha);
              }}
            />
            <!-- {$data.styles[selectedStyle][styleUIData.styleData[1].forId]} -->
          {:else}
            <ColorPickerWrapper
              hex={$data.styles[selectedStyle][styleUIData.styleData[0].forId]}
              alphaEnabled={false}
              on:colorChange={(event) => {
                $data.styles[selectedStyle][styleUIData.styleData[0].forId] =
                  event.detail.hex;
              }}
            />
          {/if}
        {:else if styleUIData.type == UITypeEnums.SLIDER}
          <input
            type="range"
            min={styleUILinkerConfigerations[i].styleData[0].data.start}
            max={styleUILinkerConfigerations[i].styleData[0].data.end}
            class="range"
            bind:value={$data.styles[selectedStyle][
              styleUIData.styleData[0].forId
            ]}
          />
        {:else if styleUIData.type == UITypeEnums.TOGGLE}
          <!-- @ts-ignore -->
          <input
            type="checkbox"
            class="toggle"
            bind:checked={$data.styles[selectedStyle][
              styleUIData.styleData[0].forId
            ]}
          />
        {/if}
      </div>
    {/each}
  {/key}

  <div
    class="tooltip min-h-12 mt-auto w-full rounded-t-lg bg-base-300 p-4 text-center"
    data-tip="This is not an exact representation of how it will look. Double check when putting it on youtube on diffrent devices to see how it actually looks."
  >
    The quick brown fox jumps over the lazy dog
  </div>
</div>
