<script lang="ts">
  import type { captionElem } from "$lib/captionDataManager";
  import { Icon, Clock, XMark } from "svelte-hero-icons";
  // export let id : number;
  // export let captionData: captionElem;

  export let id: number;
  export let captionsData: captionElem[];

  //Makes sure it follows hh:mm:ss.ms rule by checking if its in that format and making sure the first and last char are numbers
  //Valid Example: 00:01:02.003
  const INPUT_PATTERN = /([0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3})?(^\d.*\d$)/gm;

  let issueWithStart = false;
  let issueWithEnd = false;

  function updateTimes() {
    //TODO verify the times are valid
    //Verify that the time is in the correct format
    // if (!INPUT_PATTERN.test(inputTime)) {
    // 	inputColors[inputId] = 'red';
    // } else inputColors[inputId] = 'base';
  }

  function setStartTime(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ): any {
    captionsData[id].startTime = (event?.target as HTMLInputElement).value;
  }

  function setEndTime(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ): any {
    captionsData[id].endTime = (event?.target as HTMLInputElement).value;
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
    <!-- outline outline-warning -->
    <input
      type="text"
      placeholder="Start"
      class="input-bordered input h-10 w-32"
      value={captionsData[id].startTime}
      on:input={setStartTime}
    />
    <p class="p-2">to</p>
    <input
      type="text"
      placeholder="End"
      class="input-bordered input h-10 w-32"
      value={captionsData[id].endTime}
      on:input={setEndTime}
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
