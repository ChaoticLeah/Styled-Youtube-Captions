<script lang="ts">
  import { StyleUiEnums, type captionElem } from "$lib/captionDataManager";
  import { Icon, Clock, XMark } from "svelte-hero-icons";
  import TimeInput from "./TimeInput.svelte";

  export let id: number;
  export let captionsData: captionElem[];

  type TimeEvent = { detail: number };
  let startTime = 0;
  function setStartTime(event: TimeEvent): any {
    startTime = event.detail;
    captionsData[id][StyleUiEnums.START_TIME] = event.detail;
  }

  function setEndTime(event: TimeEvent): any {
    captionsData[id][StyleUiEnums.DURATION] = event.detail - startTime;
  }

  function setValue(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ): any {
    captionsData[id].value = (event?.target as HTMLInputElement).value;
  }

  function removeCaptionElem(id: number) {
    captionsData = captionsData.filter((_, i) => i !== id);
  }
</script>

<div class="card flex w-full flex-col overflow-clip bg-base-100">
  <!-- <div class="flex flex-col m-4"> -->
  <div class="flex items-center px-2">
    <div class="p-2">
      <Icon src={Clock} size="24" />
    </div>
    <TimeInput
      placeholder="Start"
      value={captionsData[id][StyleUiEnums.START_TIME]}
      on:timeChanged={setStartTime}
    />
    <p class="p-2">to</p>
    <TimeInput
      placeholder="End"
      value={captionsData[id][StyleUiEnums.START_TIME] +
        captionsData[id][StyleUiEnums.DURATION]}
      on:timeChanged={setEndTime}
    />

    <!-- <button class="btn btn-ghost">LOL</button>
    <button class="btn btn-ghost">LOL</button> -->
    <button
      class="btn-error btn-ghost btn ml-auto"
      on:click={(_event) => {
        removeCaptionElem(id);
      }}
    >
      <Icon src={XMark} size="24" />
    </button>
  </div>
  <!-- <div class="divider m-1"></div>  -->
  <textarea
    class="textarea min-h-16 resize-none rounded-t-none bg-base-200 p-4 focus:outline-none"
    placeholder="Caption Here..."
    value={captionsData[id].value}
    on:change={setValue}
  />
  <!-- </div> -->
</div>
