<script lang="ts">
  import { onMount } from "svelte";

  export const placeholder: string = "00:00:00.000";
  export let value: string = "";
  const INPUT_PATTERN = /([0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3})?(^\d.*\d$)/gm;

  $: isCorrect = true;

  function verifyInput(value: string): any {
    isCorrect = INPUT_PATTERN.test(value);
  }

  function onInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const value = (event?.target as HTMLInputElement).value;
    verifyInput(value);
  }

  onMount(() => {
    verifyInput(value);
  });
</script>

<input
  type="text"
  {placeholder}
  class="input-bordered input h-10 w-32 {isCorrect
    ? ''
    : 'outline outline-error'}"
  on:input={onInput}
  on:input
  bind:value
/>
