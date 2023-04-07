import { writable, type Writable } from "svelte/store";

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
  TEXT_ALIGNMENT = "ws",
  WRITE_POSITION = "wp",
}

//Add Style Here
enum StyleEnums {
  START_TIME = "t",
  DURATION = "d",
  WRITE_POSITION = "wp",
  PEN_ID_LINK = "p",
  TEXT_ALIGNMENT = "ws",
  STYLE_ID = "id",
  ANCHOR_POINT = "ap",
  X_COORD = "ah",
  Y_COORD = "av",
  FONT = "fs",
  FONT_COLOR = "fc",
  FONT_OPACITY = "fo",
  FONT_SIZE = "sz",
  HORIZONTAL_TEXT_ALIGNMENT = "ju",
  SHADOW_COLOR = "ec",
  SHADOW_DISTANCE = "et",
  BACKGROUND_COLOR = "bc",
  BACKGROUND_OPACITY = "bo",
  SCRIPT_CASE = "of",
  RUBY = "rb",
  BOLD = "b",
  ITALIC = "i",
  UNDERLINE = "u",
}

type captionUIElem = ParagraphStyle & { value: string };

type ParagraphStyle = {
  [StyleEnums.START_TIME]: number;
  [StyleEnums.DURATION]: number;
  [StyleEnums.WRITE_POSITION]?: number;
  [StyleEnums.PEN_ID_LINK]?: number;
  [StyleEnums.TEXT_ALIGNMENT]?: number;
};

type SpanStyle = {
  [StyleEnums.PEN_ID_LINK]: number;
};

//te isnt currently supported
type PenStyle = {
  //  No idea what hg does, something about text combination?
  [StyleEnums.STYLE_ID]: number;
  [StyleEnums.FONT]?: number;
  [StyleEnums.FONT_COLOR]?: string;
  [StyleEnums.FONT_OPACITY]?: number;
  [StyleEnums.FONT_SIZE]?: number;
  [StyleEnums.SHADOW_DISTANCE]?: number;
  [StyleEnums.BACKGROUND_COLOR]?: string;
  [StyleEnums.BACKGROUND_OPACITY]?: number;
  [StyleEnums.SCRIPT_CASE]?: number;
  [StyleEnums.RUBY]?: number;
  [StyleEnums.BOLD]?: boolean;
  [StyleEnums.ITALIC]?: boolean;
  [StyleEnums.UNDERLINE]?: boolean;
};

type TextAlignmentStyle = {
  //TODO add this when you figure it out
};

type WritePositionStyle = {
  [StyleEnums.STYLE_ID]: number;
  [StyleEnums.ANCHOR_POINT]?: number;
  [StyleEnums.X_COORD]?: number;
  [StyleEnums.Y_COORD]?: number;
};

// type Style = {
//   ParagraphStyle?: ParagraphStyle;
//   SpanStyle?: SpanStyle;
//   PenStyle?: PenStyle;
//   TextAlignmentStyle?: TextAlignmentStyle;
//   WritePositionStyle?: WritePositionStyle;
//   modifiers?: [];
// };

type MixedStyle = PenStyle & TextAlignmentStyle & WritePositionStyle;

type dataType = {
  selectedStyleIndex: number;
  styles: MixedStyle[];
  captions: captionUIElem[];
};

enum UITypeEnums {
  DROPDOWN,
  COLOR_PICKER,
  SLIDER,
  TOGGLE,
}

//Add Style Here

const styleUILinkerConfigerations: {
  type: UITypeEnums;
  name: string;
  styleData: {
    forId: StyleEnums;
    default: any;
    data: any;
  }[];
}[] = [
  {
    type: UITypeEnums.DROPDOWN,
    name: "Font",
    styleData: [
      {
        forId: StyleEnums.FONT,
        default: 0,
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
    ],
  },
  {
    type: UITypeEnums.COLOR_PICKER,
    name: "Font Color",
    styleData: [
      {
        forId: StyleEnums.FONT_COLOR,
        default: "#ffffff",
        data: undefined,
      },
      {
        forId: StyleEnums.FONT_OPACITY,
        default: 1,
        data: undefined,
      },
    ],
  },
  {
    type: UITypeEnums.SLIDER,
    name: "Font Size",
    styleData: [
      {
        forId: StyleEnums.FONT_SIZE,
        default: 100,
        data: { start: 0, end: 300 },
      },
    ],
  },
  {
    type: UITypeEnums.COLOR_PICKER,
    name: "Shadow Color",
    styleData: [
      {
        forId: StyleEnums.SHADOW_COLOR,
        default: "#ffffff",
        data: undefined,
      },
    ],
  },
  {
    type: UITypeEnums.SLIDER,
    name: "Shadow Distance",
    styleData: [
      {
        forId: StyleEnums.SHADOW_DISTANCE,
        default: 0,
        data: { start: 0, end: 300 },
      },
    ],
  },
  {
    type: UITypeEnums.COLOR_PICKER,
    name: "Background Color",
    styleData: [
      {
        forId: StyleEnums.BACKGROUND_COLOR,
        default: "#000000",
        data: undefined,
      },
      {
        forId: StyleEnums.BACKGROUND_OPACITY,
        default: 0,
        data: undefined,
      },
    ],
  },

  {
    type: UITypeEnums.DROPDOWN,
    name: "Subscript/Superscript",
    styleData: [
      {
        forId: StyleEnums.SCRIPT_CASE,
        default: 1,
        data: [
          { value: 0, label: "Subscript" },
          { value: 1, label: "Default" },
          { value: 2, label: "Superscript" },
        ],
      },
    ],
  },
  {
    type: UITypeEnums.TOGGLE,
    name: "Bold",
    styleData: [
      {
        forId: StyleEnums.BOLD,
        default: false,
        data: undefined,
      },
    ],
  },
  {
    type: UITypeEnums.TOGGLE,
    name: "Italic",
    styleData: [
      {
        forId: StyleEnums.ITALIC,
        default: false,
        data: undefined,
      },
    ],
  },
  {
    type: UITypeEnums.TOGGLE,
    name: "Underline",
    styleData: [
      {
        forId: StyleEnums.UNDERLINE,
        default: false,
        data: undefined,
      },
    ],
  },
];

//Add Style Here
const fragmentExportTypes = {
  [StyleEnums.FONT]: FragmentEnum.PEN,
  [StyleEnums.FONT_COLOR]: FragmentEnum.PEN,
  [StyleEnums.FONT_SIZE]: FragmentEnum.PEN,
  [StyleEnums.HORIZONTAL_TEXT_ALIGNMENT]: FragmentEnum.TEXT_ALIGNMENT,
  [StyleEnums.SHADOW_COLOR]: FragmentEnum.PEN,
  [StyleEnums.SHADOW_DISTANCE]: FragmentEnum.PEN,
  [StyleEnums.BACKGROUND_COLOR]: FragmentEnum.PEN,
  [StyleEnums.SCRIPT_CASE]: FragmentEnum.PEN,
  [StyleEnums.BOLD]: FragmentEnum.PEN,
  [StyleEnums.ITALIC]: FragmentEnum.PEN,
  [StyleEnums.UNDERLINE]: FragmentEnum.PEN,
};

function generateNewStyle(id: number): MixedStyle {
  let newStyle: MixedStyle = {
    id,
  };
  for (const config of styleUILinkerConfigerations) {
    //TODO Investigate this error
    for (const iterator of config.styleData) {
      //@ts-ignore
      newStyle[iterator.forId] = iterator.default;
    }
  }
  console.log(newStyle);
  return newStyle;
}

let data: Writable<dataType> = writable({
  selectedStyleIndex: 0,
  styles: [{ ...generateNewStyle(0) }],
  captions: [
    {
      [StyleEnums.START_TIME]: 0,
      [StyleEnums.DURATION]: 1000,
      value: "test",
    },
  ],
});

export {
  data,
  generateNewStyle,
  styleUILinkerConfigerations,
  fragmentExportTypes,
  UITypeEnums,
  StyleEnums as StyleUiEnums,
  FragmentEnum,
};
export type {
  captionUIElem as captionElem,
  color,
  dataType,
  MixedStyle,
  ParagraphStyle,
};
