<script lang="ts">
  import ColorPicker, {
    type HsvaColor,
    type RgbaColor,
  } from "svelte-awesome-color-picker";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  //Init it with the color
  export let hex: string;
  export let alpha: number = 1;
  export let alphaEnabled: boolean;

  hex = addAlpha(hex, alpha);

  function addAlpha(hexString: string, alpha: number): string {
    const hex = hexString.replace("#", "");
    const redHex = hex.slice(0, 2);
    const greenHex = hex.slice(2, 4);
    const blueHex = hex.slice(4, 6);
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    const colorHex = redHex + greenHex + blueHex;
    return "#" + colorHex + alphaHex;
  }

  function extractAlpha(hexString: string): number {
    const hex = hexString.replace("#", "");
    const alphaHex = hex.slice(6, 8);
    const alpha = parseInt(alphaHex, 16) / 255;
    return Number.isNaN(alpha) ? 1 : alpha;
  }

  function removeAlpha(hexString: string): string {
    const hex = hexString.replace("#", "");
    const colorHex = hex.slice(0, 6);
    return "#" + colorHex;
  }

  function colorChanged(
    input: CustomEvent<{
      hsv: HsvaColor;
      rgb: RgbaColor;
      hex: string;
      color: any | undefined;
    }>
  ) {
    dispatch("colorChange", {
      hex: removeAlpha(hex),
      alpha: extractAlpha(hex),
    });
  }
</script>

<ColorPicker bind:hex on:input={colorChanged} isAlpha={alphaEnabled} />
