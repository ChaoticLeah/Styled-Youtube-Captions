export let currentLang = {};

function switchLanguage(langJSON) {
  //loop though all the keys in the json and find the element with the same id as the key
  for (var key in langJSON) {
    var element = document.getElementById(key);
    if (element) {
      //set the text to the value of the key
      element.innerHTML = langJSON[key];
    }
  }
}

//Load the language file and switch the language
function loadLangAndSwitch(langPath) {
  fetch(langPath)
    .then((response) => response.json())
    .then((json) => {
      currentLang = json;
      switchLanguage(json);
    });
}

let addedLangSwitcher = false;
if (!addedLangSwitcher) addLangSelectListener();
//Add an event listener to the language switcher so that it will change the language when clicked
export function addLangSelectListener() {
  if (addedLangSwitcher) return;

  addedLangSwitcher = true;
  //load the supported languages
  fetch("languages/supported_languaged.json")
    .then((response) => response.json())
    .then((json) => {
      //loop through the languages and add them to the dropdown
      let langs = json.supportedLangs;

      //loop though the keys
      for (var key in langs) {
        //create a new option element
        let option = document.createElement("option");
        //set the value to the key
        option.value = key;
        //set the text to the value
        option.innerHTML = langs[key];
        //add the option to the dropdown
        let langSelects = document.getElementsByClassName("langSelect");
        [...langSelects].forEach((langSelect) => {
          langSelect.appendChild(option);
        });
      }

      //try to pull an already set language from local storage
      var lang = localStorage.getItem("lang");
      //if there is a language set, load it
      if (lang) {
        //if it is set, load the language file and switch the language
        loadLangAndSwitch(`languages/${lang}.json`);

        let langSelects = document.getElementsByClassName("langSelect");
        [...langSelects].forEach((langSelect) => {
          //set the selected value to the language
          langSelect.value = lang;
        });
      }
    });

  let langSelect = document.getElementsByClassName("langSelect");
  //add the listene to all the language selectors
  for (let selector of langSelect) {
    selector.addEventListener("change", function (e) {
      let lang = e.target.value;
      //set the language in local storage
      localStorage.setItem("lang", lang);
      //load the language file and switch the language
      loadLangAndSwitch(`languages/${lang}.json`);
    });
  }
}
