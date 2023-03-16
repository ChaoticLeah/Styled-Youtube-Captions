<script lang="ts">
  import { baseStyle, data } from "$lib/captionDataManager";
  import CaptionChunkHolder from "$lib/components/CaptionChunkHolder.svelte";
  import CaptionsArea from "$lib/components/CaptionsArea.svelte";
  import FieldAdder from "$lib/components/FieldAdder.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Styler from "$lib/components/Styler.svelte";
  import autoAnimate from "@formkit/auto-animate";

  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import { DocumentArrowDown, Icon } from "svelte-hero-icons";

  onMount(() => {
    toast.success("It works!");
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
      <div class="btn-group h-12 w-80 overflow-x-scroll rounded-md bg-base-200">
        <!-- <button class="btn btn-active">Base</button>
        <button class="btn">1</button>
        <button class="btn">2</button>
        <button class="btn">3</button>
  
        <button class="btn">4</button>
        <button class="btn">5</button>
        <button class="btn">6</button>
        <button class="btn">7</button>
        <button class="btn">8</button> -->
        {#each data.styles as styleData, i}
          <button class={`btn ${(i == data.selectedStyleIndex) ? "btn-active " : ""}`}
          on:click={(event)=>{
            data.selectedStyleIndex = i;
          }}
            >{styleData.id}</button
          >
        {/each}
      </div>
      <button
        class="btn"
        on:click={(event) => {
          let newStyle = Object.create(baseStyle);
          newStyle.id = data.styles.length.toString();
          data.styles = [...data.styles, newStyle];
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

    <button class="btn glass btn-circle absolute bottom-0 left-0 m-10">
      <Icon src={DocumentArrowDown} size="24" />
    </button>
  </div>
</div>
