import { StyleUiEnums, type style } from "./captionDataManager";
import { data, type dataType } from "./captionDataManager";

let dat: dataType;
data.subscribe((value) => {
  dat = value;
});

enum FragmentType {
  PARAGRAPH = "p",
  SPAN = "pen",
  PEN = "s",
}

function captionFragmentStyleStringGenerator(styles: style) {
  let builderString = "";
  for (const key in styles) {
    let styleData = styles[key as StyleUiEnums];
    if (typeof styleData == "boolean") styleData = styleData ? 1 : 0;
    builderString += ` ${key}="${styleData}"`;
  }
  return builderString;
}

function generateCaptionFragment(
  fragmentType: FragmentType,
  value: string,
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
  return `<${typeString} ${
    !!start ? startAndEnd : ""
  }${extraStylesString}>${value}</${typeString}>`;
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

function exportToYtt() {
  let captions = [];
  let captionStypes = [];

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
      captionElem.value,
      startTime,
      endTime,
      {
        [StyleUiEnums.BOLD]: true,
        [StyleUiEnums.FONT]: 10,
      }
    );
    // console.log(captionFragment);
    captions.push(captionFragment);
  }

  const file = `<?xml version="1.0" encoding="utf-8" ?>
    <timedtext format="3">
    <head>

    </head>
    <body>
      ${captions.join("\n")}
    </body>
    </timedtext>`;
  console.log(file);
}

export { exportToYtt };
