import { generateFile } from "./generateFile.js";
import { load } from "./saveSystem.js";
import { AddStyle } from "./styleManager.js";
import { download, readText } from "./toolbox.js";

//Hide the main display until a file is selected
document.getElementById("main").style.display = "none";
//when the file input gets a file go to the main page
document.getElementById("VTTSELECTOR").addEventListener("change", () => {
  //Show the main page
  document.getElementById("main").style.display = "block";
  //hide the uploader page
  document.getElementById("uploadVTT").setAttribute("hidden", true);

  //Get the file
  var file = document.getElementById("VTTSELECTOR").files[0];
  //Read the file as text
  readText(file, (e) => {
    //Read it line by line
    let lines = e.split("\n");

    //Remove the start lines (they specify the language and stuff, we dont need this)
    lines.shift();
    lines.shift();
    lines.shift();
    //get all the content, and put it back together
    let content = "\n" + lines.join("\n");

    //This splits the subtitles up by each "section"
    let sections = content.split("\r").join("").split("\n\n");
    //Remove the empty lines (there is one at the start and end)
    sections.shift();
    sections.pop();
    //Add all the sections to the page
    for (let i = 0; i < sections.length; i++) {
      //Split the text from the timing data in the file
      let lines = sections[i].split("\n");
      let title = lines[0];
      lines.shift();
      lines = lines.join("\n");
      //Add the subtitle
      appendSubtitle(lines, title);
    }
  });
  //On init we will add a default style that will be auto applied to everything
  AddStyle("default");
});
document.getElementById("LoadMenu").addEventListener("click", () => {
  //Try load the save, and if it succeeds then go to the main screen
  if (load()) {
    //Show the main page
    document.getElementById("main").style.display = "block";
    //hide the uploader page
    document.getElementById("uploadVTT").setAttribute("hidden", true);
  }
});

//Add subtitles to the page
export function appendSubtitle(text, time) {
  let div = document.createElement("div");
  div.setAttribute("class", "SubtitleDiv");
  let title = time;
  div.innerHTML = `        <h2 class = "h2">${title}</h2>
  <textarea class="subtitleText">${text}</textarea>`;
  document.getElementById("subtitleHolder").appendChild(div);
}

//Add the download listener to download the file when download is hit
document.getElementById("download").addEventListener("click", () => {
  download(generateFile(), "fancyFontTranscript.ytt");
});
