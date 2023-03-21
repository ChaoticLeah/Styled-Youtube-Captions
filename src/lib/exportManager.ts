import type { style } from "./captionDataManager";

enum FragmentType {
  PARAGRAPH,
  SPAN,
  PEN,
}

function generateCaptionFragment(
  fragmentType: FragmentType,
  value: string,
  //In ms
  start?: number,
  end?: number,
  styles?: style
) {
  let typeString: string;
  if (fragmentType == FragmentType.PARAGRAPH) typeString = "p";
  else if (fragmentType == FragmentType.PEN) typeString = "pen";
  else if (fragmentType == FragmentType.SPAN) typeString = "s";
  else {
    console.warn(`No fragment of type ${fragmentType} found`);
    return "";
  }
  const startAndEnd = `t="${start}" d="${(end ?? 0) - (start ?? 0)}"`;
  return `<${typeString} ${!!start ? startAndEnd : ""} TODOSTYLES>${value}</`;
}

function exportToYtt() {
  const captionFragment = `<p p="0" t="2000" d="3000">ADD each styled bit here as a <s> </p>`;

  const file = `<?xml version="1.0" encoding="utf-8" ?>
    <timedtext format="3">
    <head>

    </head>
    <body>

    </body>
    </timedtext>`;
}

export { exportToYtt };
