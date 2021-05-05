import { styleData, styleToXML } from "./styleManager.js";
import {
  insertBefore,
  insertReplace,
  replaceHtml,
  toMillis,
} from "./toolbox.js";

//This is the bare bones of the file. It will be filled in when it runs
let baseFile = `
<?xml version="1.0" encoding="utf-8"?><timedtext format="3"
  ><head>
    <!--HEAD-->
    <pen id="0" fo="0" bo="0" />

  </head>
  <body>
  <!--BODY-->
  </body></timedtext
>
`;
//This is the basic data for a pen element
let penGen = `<pen DATA/>`;
//This is the basic data for a single caption section
let baseCaption = `<p p="0" DATA>​<s p="1">​TEXT​​</s></p>`;

//This function will return a string that can then go into a .ytt file
export function generateFile() {
  //lets start by generating the headers (A pen is kinda like the <style> in css.)
  let penHeaders = "";
  //loop through the styledata(this is made by the user), and make the string to put in the files header
  //loop through each style
  for (let j = 0; j < styleData.length; j++) {
    let dat = "";
    //loop through all the elements in each style, then add it to a string
    for (let i = 0; i < Object.keys(styleData[j]).length; i++) {
      let k = Object.keys(styleData[j])[i];
      if (styleData[j][k] != -1)
        dat += styleToXML[k] + '="' + styleData[j][k] + '" ';
    }
    //add each <pen> element to the penHeaders string for adding to the files header later
    penHeaders += insertReplace("DATA", penGen, dat);
  }

  //get all the subtitle elements in the html
  let subtitles = document.getElementsByClassName("SubtitleDiv");
  //create the final string that we will return
  let finalString = baseFile;

  //insert the generated pen headers string
  finalString = insertBefore("<!--HEAD-->", finalString, penHeaders);

  //loop through all the subtitles and convert them to the .ytt format
  for (let i = 0; i < subtitles.length; i++) {
    //get a subtitle
    let subtitle = subtitles[i];
    //get the "header" of the subtitle (This just contains the start and stop timestamp we will need)
    let headers = subtitle
      .getElementsByClassName("h2")[0]
      .innerHTML.split(" --&gt; ");

    //Convert the start time to milliseconds
    let startTime = toMillis(headers[0]);

    //convert the duration to milliseconds
    let dir = toMillis(headers[1]) - startTime;

    //Get the text of that subtitle section
    let text = subtitle.getElementsByClassName("subtitleText")[0].value;

    //parse the (1) tags and stuff. Replace them with the required code for it to have that style
    //loop through all the styles
    for (let j = 0; j < styleData.length; j++) {
      //get the id of the style so that we can check if the number is that id
      let id = styleData[j].id;
      //Surround the found tags with the required styling code (if there were any)
      text = replaceHtml(
        `(${id})`,
        text,
        `</s>​<s p="${id}">​`, //close the default tag first
        `</s>​<s p="1">​`
      );
    }

    //Convert the date and time into a data string that the file can use
    let data = `t="${startTime}" d="${dir}"`;

    //put the data in the correct location
    let string = insertReplace(
      "TEXT",
      insertReplace("DATA", baseCaption, data),
      text.trim()
    );

    //Insert the all the generated body code into the final string
    finalString = insertBefore("<!--BODY-->", finalString, string);
  }
  //Return the string
  return finalString;
}
