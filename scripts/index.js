import { generateFile } from "./generateFile.js";
import { addLangSelectListener } from "./languageSwitcher.js";
import { load } from "./saveSystem.js";
import { AddStyle, selectedStyle } from "./styleManager.js";
import { download, readText, wrapSelection } from "./toolbox.js";

//version format: major.minor.patch
const version = "1.1.5";

//So that we can change languages
addLangSelectListener();

//This is used to give each textbox a unique ID
let uniqueIdentifierCounter = 0;
let lastSelectedTextArea = -1;

//Hide the main display until a file is selected
document.getElementById("main").style.display = "none";

function loadFile(file) {
  //Show the main page
  document.getElementById("main").style.display = "block";
  //hide the uploader page
  document.getElementById("uploadVTT").setAttribute("hidden", true);

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
      appendSubtitle(lines, title, i);
    }
  });
  //On init we will add a default style that will be auto applied to everything
  AddStyle("default");
}

//For later if an animation is added or anything when a file is dragged into the page to be uploaded
document.getElementById("uploadVTT").ondragover = function (e) {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = "copy";

  return false;
};
//let files be dragged onto uploadVTT to load them
document.getElementById("uploadVTT").ondrop = function (e) {
  e.preventDefault();
  e.stopPropagation();
  //check the file type and if its the correct type load it
  if (e.dataTransfer.files[0].name.split(".")[1] == "vtt") {
    loadFile(e.dataTransfer.files[0]);
  } else {
    //If the file is not a vtt file then show an error
    alert("Please upload a .vtt file");
  }
};

//when the file input gets a file go to the main page
document.getElementById("VTTSELECTOR").addEventListener("change", () => {
  loadFile(document.getElementById("VTTSELECTOR").files[0]);
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
export function appendSubtitle(text, time, id = 0, location = -1) {
  let div = document.createElement("div");
  div.setAttribute("class", "SubtitleDiv");
  let title = time.split(" --> ");
  /*
  div.innerHTML = `<div class = "titleHolder" id="subtitle${id}"><h2 class = "h2">${title}</h2></div>
  <div class = "controls">
    <button class = "deleteButton" onClick = "this.parentElement.parentElement.remove();">X</button>
  </div>
  <br>

  <textarea class="subtitleText" id="textArea${uniqueIdentifierCounter}">${text}</textarea>
`;
*/

  div.innerHTML = `<div class = "titleHolder" id="subtitle${id}">          <input type="text" class = "h2" id = "start" value = "${title[0]}"><input type="text" class = "h2" id = "stop" value = "${title[1]}">
</div>
<div class = "controls">
  <button class = "deleteButton" onClick = "this.parentElement.parentElement.remove();">X</button>
</div>
<br>

<textarea class="subtitleText" id="textArea${uniqueIdentifierCounter}">${text}</textarea>
<button class = "addSubtitleBelow">+</button>

`;
  //If no location is specified add it to the end, otherwise add it to the specified location
  if (location == -1)
    document.getElementById("subtitleHolder").appendChild(div);
  else {
    //Location is a element, we will add the new subtitle div after that element
    location.after(div);
  }

  //This lets us detect a selection of a textbox, this is used for the shortcut that autosurrounds
  document
    .getElementById(`textArea${uniqueIdentifierCounter}`)
    .addEventListener("select", (evnt) => {
      lastSelectedTextArea = evnt.target.id;
    });

  //Add a click listener so that when the + button is clicked we can create another subtitle element under that one

  document
    .getElementById(`subtitle${id}`)
    .parentElement.getElementsByClassName("addSubtitleBelow")[0]
    .addEventListener("click", () => {
      appendSubtitle(
        "",
        time,
        id + 0.00001,
        document.getElementById(`subtitle${id}`).parentElement
      );
    });

  uniqueIdentifierCounter++;
}

//Add the download listener to download the file when download is hit
document.getElementById("download").addEventListener("click", () => {
  let file = generateFile();
  //If the file was made without problems download it
  if (file != null) download(file, "fancyFontTranscript.ytt");
});

document.body.onkeydown = function (e) {
  //if F1/Alt is pressed then attempt to surround the selected texbox area with the style tags
  if (e.key == "F1" || e.key == "Alt") {
    e.preventDefault();
    let textArea = document.getElementById(lastSelectedTextArea);
    wrapSelection(textArea, `(${selectedStyle})`);
  }
};
