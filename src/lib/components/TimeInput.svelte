<script lang="ts">
  import { onMount } from "svelte";
  export let placeholder: string = "00:00:00.000";
  export let value: string = "";
  let INPUT_PATTERN = /([0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3})?(^\d.*\d$)/gm;

  $: isCorrect = true;

  function verifyInput(value: string): any {
    isCorrect = INPUT_PATTERN.test(value.trim());
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

<div
  class="tooltip tooltip-bottom"
  data-tip="The time should be in the format hour:min:sec.ms"
>
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
</div>
