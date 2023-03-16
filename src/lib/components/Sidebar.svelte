<script lang="ts">
  export let className: string | undefined = undefined;

  export let width = 60;
  export let x = 20;

  const grabberWidth = 10;

  let expanding: boolean = false;
  let start: number = 0,
    initial: { x: number; width: number } = { x: 0, width: 0 };

  function startExpand(event: MouseEvent) {
    expanding = true;
    start = event.pageX;
    initial = { x, width };
  }

  function stopExpand() {
    expanding = false;
    start = 0;
    initial = { x: 0, width: 0 };
  }

  function resize(event: MouseEvent) {
    if (!expanding) return;

    const delta = start - event.pageX;
    x = initial.x - delta;
    width = initial.width + delta;
  }
</script>

<svelte:window on:mouseup={stopExpand} on:mousemove={resize} />

<div class={`flex flex-row float-right ` + className} style={`width:${width}px; x:${x}px`}>
  <div
    data-testid="handle"
    class="h-full w-4 cursor-col-resize flex items-center justify-center overflow-auto" 
    on:mousedown={startExpand}
    class:active={expanding==true}
  >
  <div class="h-full w-0 border-l border-base-200"></div> 
  </div>

  <div class="flex-grow m-5">
    <slot />
  </div>
</div>
