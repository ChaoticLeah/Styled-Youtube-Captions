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

//These are used in the editor, and are translated when the file is exported
//ASSIGN THESE VALUES SO THAT WHEN ITS UPDATED IT DOESNT SHIFT THE ID'S FOR IMPORT
enum EditorEnums {
  //For the caption chunks
  START_TIME = "START_TIME",
  DURATION = "DURATION",
  VALUE = "VALUE",
  //Just stuff so you can organize your styles better
  NOTE = "NOTE",
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  UNDERLINE = "UNDERLINE",
  FONT = "FONT",
  FONT_SIZE = "FONT_SIZE",
}

enum EditorInputTypes {
  BOOLEAN,
  SHORT_TEXT,
  LONG_TEXT,
  SELECT,
  NUMBER,
  COLOR_WITHOUT_ALPHA,
  COLOR_WITH_ALPHA,
}

//Dont export, this is for internal use to not confuse anyone with this and EditorUITypes
type EditorStyleType = {
  [EditorEnums.NOTE]: string;
  [EditorEnums.BOLD]?: boolean;
  [EditorEnums.ITALIC]?: boolean;
  [EditorEnums.UNDERLINE]?: boolean;
  [EditorEnums.FONT]?: number
  [EditorEnums.FONT_SIZE]?: number;
};

//This is used so that the style editor knows what kind of input to use.
const EditorUITypes = {
  [EditorEnums.NOTE]: {type: EditorInputTypes.LONG_TEXT},
  [EditorEnums.BOLD]: {type: EditorInputTypes.BOOLEAN},
  [EditorEnums.ITALIC]: {type: EditorInputTypes.BOOLEAN},
  [EditorEnums.UNDERLINE]: {type: EditorInputTypes.BOOLEAN},
  [EditorEnums.FONT]: { type: EditorInputTypes.SELECT, data : [{value: 0, label: "TEST_FONT_1"}, {value: 1, label: "TEST_FONT_2"}]},
  [EditorEnums.FONT_SIZE]: { type: EditorInputTypes.NUMBER, data : {start :25, end: 200}},
}

type EditorCaption = {
  [EditorEnums.START_TIME]: number;
  [EditorEnums.DURATION]: number;
  [EditorEnums.VALUE]: string;
};

type EditorSave = {
  selectedStyleIndex: number;
  styles: EditorStyleType[];
  captions: EditorCaption[];
};

let data: Writable<EditorSave> = writable({
  selectedStyleIndex: 0,
  styles: [{ [EditorEnums.NOTE]: "", [EditorEnums.BOLD] : false, [EditorEnums.FONT_SIZE] : 29, [EditorEnums.FONT]: 0 }],
  captions: [
    //TODO turn this into a generator function
    {
      [EditorEnums.START_TIME]: 0,
      [EditorEnums.DURATION]: 1000,
      [EditorEnums.VALUE]: "test",
    },
  ],
});

export {
  data,
  EditorUITypes,
  StyleEnums,
  FragmentEnum,
  EditorEnums,
  EditorInputTypes
};
export type { color };
