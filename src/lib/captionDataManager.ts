type captionElem = {
  startTime: string;
  endTime: string;
  value: string;
};

type color = {
  hex: string;
  opacity: number;
};

type style = {
  id: string;
  [StyleUiEnums.FONT]: "";
  [StyleUiEnums.FONT_COLOR]: color;
  [StyleUiEnums.FONT_SIZE]: number;
  [StyleUiEnums.SHADOW_COLOR]: color;
  [StyleUiEnums.SHADOW_DISTANCE]: number;
  [StyleUiEnums.BACKGROUND_COLOR]: color;
  [StyleUiEnums.BOLD]: boolean;
  [StyleUiEnums.ITALIC]: boolean;
  [StyleUiEnums.UNDERLINE]: boolean;
};

enum UITypeEnums {
  DROPDOWN,
  COLOR_PICKER,
  SLIDER,
  TOGGLE,
}

enum StyleUiEnums {
  FONT,
  FONT_COLOR,
  FONT_SIZE,
  SHADOW_COLOR,
  SHADOW_DISTANCE,
  BACKGROUND_COLOR,
  BOLD,
  ITALIC,
  UNDERLINE,
}

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
      { value: -1, label: "Default" },
      { value: 1, label: "Courier New" },
      { value: 2, label: "Times New Roman" },
      { value: 3, label: "Lucida Console" },
      { value: 5, label: "Comic Sans Ms" },
      { value: 6, label: "Monotype Corsiva" },
      { value: 7, label: "Carrois Gothic Sc" },
      { value: "_", label: "Roboto" },
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

let baseStyle: style = {
  id: "default",
  [StyleUiEnums.FONT]: "",
  [StyleUiEnums.FONT_COLOR]: {
    hex: "#ffffff",
    opacity: 1,
  },
  [StyleUiEnums.FONT_SIZE]: 100,
  [StyleUiEnums.SHADOW_COLOR]: {
    hex: "#000000",
    opacity: 1,
  },
  [StyleUiEnums.SHADOW_DISTANCE]: 1,
  [StyleUiEnums.BACKGROUND_COLOR]: {
    hex: "#ffffff",
    opacity: 1,
  },
  [StyleUiEnums.BOLD]: false,
  [StyleUiEnums.ITALIC]: false,
  [StyleUiEnums.UNDERLINE]: false,
};

let data: {
  selectedStyleIndex: number;
  styles: style[];
  captions: captionElem[];
} = {
  selectedStyleIndex: 0,
  styles: [baseStyle],
  captions: [
    {
      startTime: "1",
      endTime: "2",
      value: "test",
    },
  ],
};

export { data, baseStyle, styleUIConfigurations, UITypeEnums, StyleUiEnums };
export type { captionElem, style, color };
