import { writable, type Writable } from "svelte/store";

type captionElem = {
  startTime: string;
  endTime: string;
  value: string;
  //For if you want just 1 text elem to have a style.
  customStyle?: style;
};

type color = {
  // hex: string;
  // opacity: number;
  r: number;
  g: number;
  b: number;
  a: number;
};

enum FragmentEnum {
  PARAGRAPH = "p",
  SPAN = "s",
  PEN = "pen",
  WRITE_SPOT = "ws",
  WRITE_POSITION = "wp",
}


//Add Style Here
enum StyleUiEnums {
  FONT = "fs",
  FONT_COLOR = "fc/fo",
  FONT_SIZE = "sz",
  HORIZONTAL_TEXT_ALIGNMENT = "ju",
  SHADOW_COLOR = "ec",
  SHADOW_DISTANCE = "et",
  BACKGROUND_COLOR = "bc/bo",
  SCRIPT_CASE = "of",
  BOLD = "b",
  ITALIC = "i",
  UNDERLINE = "u",
}


//Add Style Here
type style = {
  id?: number;
  [StyleUiEnums.FONT]?: number;
  [StyleUiEnums.FONT_COLOR]?: color;
  [StyleUiEnums.FONT_SIZE]?: number;
  [StyleUiEnums.HORIZONTAL_TEXT_ALIGNMENT]?: number,
  [StyleUiEnums.SHADOW_COLOR]?: color;
  [StyleUiEnums.SHADOW_DISTANCE]?: number;
  [StyleUiEnums.BACKGROUND_COLOR]?: color;
  [StyleUiEnums.SCRIPT_CASE]?: number;
  [StyleUiEnums.BOLD]?: boolean;
  [StyleUiEnums.ITALIC]?: boolean;
  [StyleUiEnums.UNDERLINE]?: boolean;
  //Modifiers are things like animations that can modify any of the above set styles
  modifiers?: [];
};

type dataType = {
  selectedStyleIndex: number;
  styles: style[];
  captions: captionElem[];
};

enum UITypeEnums {
  DROPDOWN,
  COLOR_PICKER,
  SLIDER,
  TOGGLE,
}


//Add Style Here
const styleUIConfigurations: {
  type: number;
  name: string;
  forId: StyleUiEnums;
  data: any;
}[] = [
  {
    type: UITypeEnums.DROPDOWN,
    name: "Font",
    forId: StyleUiEnums.FONT,
    data: [
      { value: 0, label: "Default" },
      { value: 1, label: "Courier New" },
      { value: 2, label: "Times New Roman" },
      { value: 3, label: "Lucida Console" },
      { value: 4, label: "Roboto" },
      { value: 5, label: "Comic Sans Ms" },
      { value: 6, label: "Monotype Corsiva" },
      { value: 7, label: "Small Caps Arial" },
    ],
  },
  {
    type: UITypeEnums.COLOR_PICKER,
    name: "Font Color",
    forId: StyleUiEnums.FONT_COLOR,
    data: undefined,
  },
  {
    type: UITypeEnums.SLIDER,
    name: "Font Size",
    forId: StyleUiEnums.FONT_SIZE,
    data: { start: 0, end: 300 },
  },
  {
    type: UITypeEnums.DROPDOWN,
    name: "Horizontal text alignment",
    forId: StyleUiEnums.HORIZONTAL_TEXT_ALIGNMENT,
    data: [
      { value: 0, label: "Left" },
      { value: 1, label: "Right" },
      { value: 2, label: "Center" },
    ],
  },
  {
    type: UITypeEnums.COLOR_PICKER,
    name: "Shadow Color",
    forId: StyleUiEnums.SHADOW_COLOR,
    data: undefined,
  },
  {
    type: UITypeEnums.SLIDER,
    name: "Shadow Distance",
    forId: StyleUiEnums.SHADOW_DISTANCE,

    data: { start: 0, end: 300 },
  },
  {
    type: UITypeEnums.COLOR_PICKER,
    name: "Background Color",
    forId: StyleUiEnums.BACKGROUND_COLOR,
    data: undefined,
  },
  {
    type: UITypeEnums.DROPDOWN,
    name: "Subscript/Superscript",
    forId: StyleUiEnums.SCRIPT_CASE,
    data: [
      { value: 0, label: "Subscript" },
      { value: 1, label: "Default" },
      { value: 2, label: "Superscript" },
    ],
  },
  {
    type: UITypeEnums.TOGGLE,
    name: "Bold",
    forId: StyleUiEnums.BOLD,
    data: undefined,
  },
  {
    type: UITypeEnums.TOGGLE,
    name: "Italic",
    forId: StyleUiEnums.ITALIC,
    data: undefined,
  },
  {
    type: UITypeEnums.TOGGLE,
    name: "Underline",
    forId: StyleUiEnums.UNDERLINE,
    data: undefined,
  },
];

//Add Style Here
const fragmentExportTypes = {
  [StyleUiEnums.FONT]: FragmentEnum.PEN,
  [StyleUiEnums.FONT_COLOR]: FragmentEnum.PEN,
  [StyleUiEnums.FONT_SIZE]: FragmentEnum.PEN,
  [StyleUiEnums.HORIZONTAL_TEXT_ALIGNMENT]: FragmentEnum.WRITE_SPOT,
  [StyleUiEnums.SHADOW_COLOR]: FragmentEnum.PEN,
  [StyleUiEnums.SHADOW_DISTANCE]: FragmentEnum.PEN,
  [StyleUiEnums.BACKGROUND_COLOR]: FragmentEnum.PEN,
  [StyleUiEnums.SCRIPT_CASE]: FragmentEnum.PEN,
  [StyleUiEnums.BOLD]: FragmentEnum.PEN,
  [StyleUiEnums.ITALIC]: FragmentEnum.PEN,
  [StyleUiEnums.UNDERLINE]: FragmentEnum.PEN,
}

//Add Style Here
let baseStyle: style = {
  id: 0,
  [StyleUiEnums.FONT]: 0,
  [StyleUiEnums.FONT_COLOR]: {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  },
  [StyleUiEnums.FONT_SIZE]: 100,
  [StyleUiEnums.HORIZONTAL_TEXT_ALIGNMENT]: 2,
  [StyleUiEnums.SHADOW_COLOR]: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  [StyleUiEnums.SHADOW_DISTANCE]: 1,
  [StyleUiEnums.BACKGROUND_COLOR]: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  [StyleUiEnums.SCRIPT_CASE]: 1,
  [StyleUiEnums.BOLD]: false,
  [StyleUiEnums.ITALIC]: false,
  [StyleUiEnums.UNDERLINE]: false,
};

let data: Writable<dataType> = writable({
  selectedStyleIndex: 0,
  styles: [{ ...baseStyle }],
  captions: [
    {
      startTime: "00:00:01.840",
      endTime: "00:00:02.840",
      value: "test",
    },
  ],
});

export { data, baseStyle, styleUIConfigurations, fragmentExportTypes, UITypeEnums, StyleUiEnums, FragmentEnum };
export type { captionElem, style, color, dataType };
