<script lang="ts">
  import {
    // generateNewStyle,
    // data,
    // type dataType,
    // type style,
  } from "$lib/captionDataManager";
    import ActiveStyleSelecter from "$lib/components/ActiveStyleSelecter.svelte";
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
  import Select from "svelte-select";
  onMount(() => {
    toast.success("It works!");
  });
  // let dat: dataType;
  // data.subscribe((value) => {
  //   dat = value;
  // });

</script>

<div class="absolute top-0 h-screen w-full bg-neutral">
  <!-- <Navbar></Navbar> -->

  <Sidebar className="bg-neutral h-full min-w-min" width={250}>
    <h1 class="p-4 text-center text-xl">Styler</h1>
    <!-- <div class = "h-12 w-full bg-base-200 rounded-md">
      <button class=""></button>
    </div> -->
    <div class="flex w-full justify-center">

      <div class="form-control w-full max-w-l">
        <label class="label">
          <span class="label-text-alt">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>            
          </span>
        </label>
        <!-- <select class="select select-bordered">
          <option class = "text-red-400">Star Wars</option>
        </select> -->
        <ActiveStyleSelecter></ActiveStyleSelecter>

      </div>
      <!-- <div
        class="btn-group flex h-12 w-96 overflow-x-auto overflow-y-hidden rounded-md bg-base-200"
      >
         {#each dat.styles as styleData, i}
          <button
            class={`btn ${i == dat.selectedStyleIndex ? "btn-active " : ""}`}
            on:click={(event) => {
              let newData = $data;
              //Dont set it if its been pressed again.
              if (newData.selectedStyleIndex == i) return;
              newData.selectedStyleIndex = i;
              data.set(newData);
            }}>{styleData.id}</button
          >
        {/each} 
      </div> -->
      <!-- <button
        class="btn"
        on:click={(event) => {
          let newStyle = generateNewStyle(dat.styles.length);
          dat.styles = [...dat.styles, newStyle];
        }}>+</button -->
        
    </div>
    <div class="divider "></div> 

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
