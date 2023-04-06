<script lang="ts">
  import { StyleUiEnums, type captionElem } from "$lib/captionDataManager";
  import { Icon, Plus } from "svelte-hero-icons";

  export let id: number;
  export let captionsData: captionElem[];
  function addCaptionElem(
    _event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) {
    const newCaption: captionElem = {
      [StyleUiEnums.START_TIME]: 0,
      [StyleUiEnums.DURATION]: 1000,
      value: "",
    };

    captionsData = [
      ...captionsData.slice(0, id + 1),
      newCaption,
      ...captionsData.slice(id + 1),
    ];
  }
</script>

<div class="h-2 w-full hover:divider" id="divider">
  <button class="btn-outline btn-xs btn-circle btn" on:click={addCaptionElem}>
    <Icon src={Plus} size="12" />
  </button>
</div>

<style>
  #divider > * {
    display: none;
  }

  #divider {
    margin-top: 0rem;
    margin-bottom: 0rem;
    padding-top: 1rem /* 16px */;
    padding-bottom: 1rem /* 16px */;
    transition: 0.15s all ease;
  }

  #divider:hover {
    display: flex;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  #divider:hover > * {
    display: flex;
  }
</style>
