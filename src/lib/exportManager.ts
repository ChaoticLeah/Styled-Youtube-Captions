import rgbHex from "rgb-hex";
import { StyleUiEnums, type color, type style } from "./captionDataManager";
import { data, type dataType } from "./captionDataManager";

let dat: dataType;
data.subscribe((value) => {
  dat = value;
});

enum FragmentType {
  PARAGRAPH = "p",
  SPAN = "s",
  PEN = "pen",
}

function captionFragmentStyleStringGenerator(styles: style) {
  let builderString = "";
  for (const key in styles) {
    let styleData = styles[key as StyleUiEnums];

    //Make sure its a color, and if is hex it
    const color = styleData as color;
    if (
      color.r != undefined &&
      color.g != undefined &&
      color.b != undefined &&
      color.b != undefined
    ) {
      builderString += ` ${key.split("/")[0]}="#${rgbHex(
        color.r,
        color.b,
        color.g
      )}"`;
      if (key.includes("/")) {
        //It goes to 254 due to a youtube bug where it wont work at all on 255 ):
        builderString += ` ${key.split("/")[1]}="${color.a * 254}"`;
      }
      continue;
    }
    //The end of that color hack, if anyone has a better way please open a PR

    if (typeof styleData == "boolean") styleData = styleData ? 1 : 0;
    builderString += ` ${key}="${styleData}"`;
  }
  return builderString;
}

function generateCaptionFragment(
  fragmentType: FragmentType,
  value?: string,
  //In ms
  start?: number,
  end?: number,
  styles?: style
) {
  let typeString: string = fragmentType;
  let extraStylesString: string = "";
  if (styles) {
    extraStylesString = captionFragmentStyleStringGenerator(styles);
  }

  //TODO clean up this logic
  const startAndEnd = `t="${start}" d="${(end ?? 0) - (start ?? 0)}"`;
  return `<${typeString} ${!!start ? startAndEnd : ""}${extraStylesString}${
    value ? `>${value}</${typeString}` : "/"
  }>`;
}

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

    const startTime = toMillis(captionElem.startTime);
    const endTime = toMillis(captionElem.endTime);
    //ADD each styled bit here as a <s>
    // const captionFragment = `<p p="" t="${startTime}" d="${
    //   endTime - startTime
    // }">​<s p="1">${captionElem.value}</s></p>`;
    const captionFragment = generateCaptionFragment(
      FragmentType.PARAGRAPH,
      convertParrenStylesToYTT(captionElem.value),
      startTime,
      endTime,
      {
        id: 0,
      }
    );
    // console.log(captionFragment);
    captions.push(captionFragment);
  }

  let captionStyles = [];

  for (const style of dat.styles) {
    const styleFragment = generateCaptionFragment(
      FragmentType.PEN,
      undefined,
      undefined,
      undefined,
      style
    );
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

  download(file, "fancyFontTranscript.ytt")
}

export { exportToYtt };
