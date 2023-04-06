<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let placeholder: string = "00:00:00.000";
  export let value: number = 0;

  function toMillis(time: string) {
    //split the time by :
    let t = time.split(":");
    //get the hours
    let hours = parseFloat(t[0]);
    //get the minutes
    let minutes = parseFloat(t[1]);
    //get the seconds
    let seconds = parseFloat(t[2]);

    //convert the hours to milliseconds
    hours = hours * 60 * 60 * 1000;
    //convert the minutes to milliseconds
    minutes = minutes * 60 * 1000;
    //convert the seconds to milliseconds
    seconds = seconds * 1000;
    //add the hours, minutes, and seconds to get the total milliseconds
    let total = hours + minutes + seconds;
    return total;
  }

  function fromMillis(ms: number): string {
    // calculate the hours
    const hours = Math.floor(ms / (60 * 60 * 1000));
    ms %= 60 * 60 * 1000;
    // calculate the minutes
    const minutes = Math.floor(ms / (60 * 1000));
    ms %= 60 * 1000;
    // calculate the seconds
    const seconds = Math.floor(ms / 1000);
    // calculate the milliseconds
    const milliseconds = ms % 1000;
    // format the result as a string
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  }

  $: isCorrect = true;

  function verifyInput(value: string): any {
    isCorrect = !Number.isNaN(toMillis(value));
  }

  function onInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const str = (event?.target as HTMLInputElement).value.trim();
    verifyInput(str);
    value = toMillis(str);
    dispatch("timeChanged", value);
  }

  let initializerValue = "";

  onMount(() => {
    initializerValue = fromMillis(value);
    dispatch("timeChanged", value);
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
    value={initializerValue}
  />
</div>
