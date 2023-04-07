import rgbHex from "rgb-hex";
import {
  StyleUiEnums,
  FragmentEnum,
  fragmentExportTypes,
  type color,
  type MixedStyle,
  type ParagraphStyle,
} from "./captionDataManager";
import { data, type dataType } from "./captionDataManager";
// import { build } from "vite";

let dat: dataType;
data.subscribe((value) => {
  dat = value;
});

//TODO fix colors, and wrap them in their own thing
// function captionFragmentStyleStringGenerator(
//   styles: MixedStyle | ParagraphStyle
// ) {
//   let builderString = "";
//   for (const key in styles) {
//     console.log(key);

//     let styleData = styles[key as StyleUiEnums];

//     //Make sure its a color, and if is hex it
//     const color = styleData as color;
//     if (
//       color.r != undefined &&
//       color.g != undefined &&
//       color.b != undefined &&
//       color.b != undefined
//     ) {
//       builderString += ` ${key.split("/")[0]}="#${rgbHex(
//         color.r,
//         color.b,
//         color.g
//       )}"`;
//       if (key.includes("/")) {
//         //It goes to 254 due to a youtube bug where it wont work at all on 255 ):
//         builderString += ` ${key.split("/")[1]}="${color.a * 254}"`;
//       }
//       continue;
//     }
//     //The end of that color hack, if anyone has a better way please open a PR

//     if (typeof styleData == "boolean") styleData = styleData ? 1 : 0;
//     builderString += ` ${key}="${styleData}"`;
//   }
//   console.log(builderString);
//   return builderString;
// }

function generateCaptionFragment(
  FragmentEnum: FragmentEnum,
  styles: MixedStyle | ParagraphStyle,
  value?: string
) {
  let typeString: string = FragmentEnum;

  let stylesString = "";
  for (const [key, value] of Object.entries(styles)) {
    //TODO make this logic better
    const valueString =
      typeof value === "string" ? `"${value}"` : value ? "1" : "0";
    stylesString += `${key}=${valueString} `;
  }

  // return `<${typeString} ${stylesString}>${value}</${typeString}>`;
  return `<${typeString} ${stylesString}${
    value ? `>${value}</${typeString}>` : `/>`
  }`;
}

function download(data: string, filename: string, type?: string) {
  var file = new Blob([data], { type: type });
  //@ts-ignore
  if (window.navigator.msSaveOrOpenBlob)
    //@ts-ignore IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function extractRubyText(input: string): [string, string] | null {
  // Define a regular expression that matches "[Hello]{Ruby Text}" patterns.
  const regex = /(?<!\\)\[([^\\[\]]+)]{([^{}]+)}/;
  // Use the `exec` method to search for the first match in the input string.
  const match = regex.exec(input);
  if (match) {
    // If a match is found, return an array containing the two capture groups.
    return [match[1], match[2]];
  } else {
    // If no match is found, return null.
    return null;
  }
}

function convertParrenStylesToYTT(input: string): string {
  // Use a regular expression to match the pattern "(number)text(number)"
  const regex = /\((\d+)\)(\w+)\((\d+)\)/g;

  // Replace the matched pattern with the desired output format
  const output = input.replace(regex, '<s p="$1">$2</s>');

  return output;
}

//TODO add animation support
function exportToYtt() {
  let captions = [];

  for (const captionIndex in dat.captions) {
    const captionElem = dat.captions[captionIndex];
    const captionFragment = generateCaptionFragment(
      FragmentEnum.PARAGRAPH,
      {
        id: 0,
        [StyleUiEnums.START_TIME]: captionElem[StyleUiEnums.START_TIME],
        [StyleUiEnums.DURATION]: captionElem[StyleUiEnums.DURATION],
      },
      convertParrenStylesToYTT(captionElem.value)
    );
    // // console.log(captionFragment);
    captions.push(captionFragment);
  }

  let captionStyles = [];

  for (const styleId in dat.styles) {
    const style = dat.styles[styleId];
    const styleFragment = generateCaptionFragment(FragmentEnum.PEN, style);
    captionStyles.push(styleFragment);
  }

  const file = `<?xml version="1.0" encoding="utf-8" ?>
    <timedtext format="3">
    <head>
    ${captionStyles.join("\n")}
    </head>
    <body>
      ${captions.join("\n")}
    </body>
    </timedtext>`;
  console.log(file);

  // download(file, "fancyFontTranscript.ytt");
}

export { exportToYtt };
