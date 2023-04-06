<script lang="ts">
  import {
    generateNewStyle,
    data,
    type dataType,
    // type style,
  } from "$lib/captionDataManager";
  import CaptionChunkHolder from "$lib/components/CaptionChunkHolder.svelte";
  import CaptionsArea from "$lib/components/CaptionsArea.svelte";
  import FieldAdder from "$lib/components/FieldAdder.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Styler from "$lib/components/Styler.svelte";
  import { exportToYtt } from "$lib/exportManager";
  import autoAnimate from "@formkit/auto-animate";

  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import { DocumentArrowDown, Icon } from "svelte-hero-icons";

  onMount(() => {
    toast.success("It works!");
  });
  let dat: dataType;
  data.subscribe((value) => {
    dat = value;
  });
</script>

<div class="absolute top-0 h-screen w-full bg-neutral">
  <!-- <Navbar></Navbar> -->

  <Sidebar className="bg-neutral h-full min-w-min" width={250}>
    <h1 class="p-4 text-center text-xl">Styler</h1>
    <!-- <div class = "h-12 w-full bg-base-200 rounded-md">
      <button class=""></button>
    </div> -->
    <div class="flex">
      <div
        class="btn-group h-12 w-full overflow-x-auto overflow-y-hidden rounded-md bg-base-200"
      >
        {#each dat.styles as styleData, i}
          <button
            class={`btn ${i == dat.selectedStyleIndex ? "btn-active " : ""}`}
            on:click={(event) => {
              // dat.selectedStyleIndex = i;
              let newData = $data;
              newData.selectedStyleIndex = i;
              data.set(newData);
            }}>{styleData.id}</button
          >
        {/each}
      </div>
      <button
        class="btn"
        on:click={(event) => {
          let newStyle = generateNewStyle(dat.styles.length);
          dat.styles = [...dat.styles, newStyle];
        }}>+</button
      >
    </div>
    <!-- <h1>Styler</h1>
    <p>
      Not Done
    </p> -->
    <Styler />
  </Sidebar>

  <div class="mx-auto h-full max-w-4xl overflow-auto overflow-y-scroll p-5">
    <CaptionsArea />

    <button
      class="glass btn-circle btn absolute bottom-0 left-0 m-10"
      on:click={exportToYtt}
    >
      <Icon src={DocumentArrowDown} size="24" />
    </button>
  </div>
</div>
