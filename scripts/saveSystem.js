import { appendSubtitle } from "./index.js";
import { currentLang } from "./languageSwitcher.js";
import { setStyleData, styleData, AddStyle } from "./styleManager.js";

export function saveProject(name = "autosave") {
  //Make the save data JSON
  let json = {
    TranscriptData: getTranscript(),
    StyleData: styleData,
  };
  //Save it
  localStorage.setItem(name, JSON.stringify(json));
}

export function loadProject(name = "autosave") {
  //if no save exists under than name, return false
  if (localStorage.getItem(name) == undefined) return false;

  //Get the parsed save data
  let saveData = JSON.parse(localStorage.getItem(name));

  //Remove all old style data
  setStyleData([]);

  //Get all the buttons that you click to view the styles
  let children = Array.from(
    document.getElementById("styleButtons").querySelectorAll(".styleButton")
  );
  //delete the buttons
  for (var i = 0; i < children.length; i++) {
    let child = children[i];
    //leave the add style button
    if (child.id != "addStyle")
      try {
        document.getElementById("subtitleHolder").removeChild(child);
      } catch (error) {}
  }

  //Get all the old subtitles and remove them
  let subtitles = Array.from(
    document.getElementById("subtitleHolder").querySelectorAll(".SubtitleDiv")
  );
  //delete the transcripts
  for (var i = 0; i < subtitles.length; i++) {
    document.getElementById("subtitleHolder").removeChild(subtitles[i]);
  }

  //Add all the style data and buttons
  let styleDat = saveData.StyleData;
  styleDat.forEach((s) => {
    if (Number(s.id) == 1) AddStyle(currentLang["default"], s);
    else AddStyle("", s);
  });

  //Add all the transcripts
  let transcriptDat = saveData.TranscriptData;
  transcriptDat.forEach((dat) => {
    appendSubtitle(dat.text, dat.timestamp);
  });
  return true;
}

export function load() {
  //A simpler load wraper for the loadProject function
  let saveName = prompt(
    `What project would you like to load? Projects: ${getItemsInLocalStorage()}`
  );
  return loadProject(saveName);
}

//Read all the data from the webpage's html
function getTranscript() {
  let subtitleArr = [];
  //Get all the subtitle divs
  let subtitles = Array.from(
    document
      .getElementById("subtitleHolder")
      .getElementsByClassName("SubtitleDiv")
  );
  //add the subtitles and timestamps to an array
  subtitles.forEach((s) => {
    subtitleArr.push({
      timestamp: s.getElementsByClassName("h2")[0].innerHTML,
      text: s.getElementsByClassName("subtitleText")[0].value,
    });
  });
  //Return the array of subtitles and timestamps
  return subtitleArr;
}

function getItemsInLocalStorage() {
  let lngth = localStorage.length;
  let arr = [];
  //Read through all the things in localstorage and add it to the array
  for (let i = 0; i < lngth; i++) {
    arr.push(localStorage.key(i));
  }
  return arr;
}

function init() {
  //Add the click listeners
  document.getElementById("Save").addEventListener("click", () => {
    let saveName = prompt(`What would you like to save this project as?`);
    saveProject(saveName);
  });

  document.getElementById("Load").addEventListener("click", () => {
    load();
  });
}

//Run this at the start
init();
