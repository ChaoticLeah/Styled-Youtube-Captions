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
      console.log(json);
      switchLanguage(json);
    });
}

//Add an event listener to the language switcher so that it will change the language when clicked
export function addLangSelectListener() {
  //try to pull an already set language from local storage
  var lang = localStorage.getItem("lang");
  //if there is a language set, load it
  if (lang) {
    //if it is set, load the language file and switch the language
    loadLangAndSwitch(`/languages/${lang}.json`);
  }

  let langSelect = document.getElementsByClassName("langSelect");
  //add the listene to all the language selectors
  for (let selector of langSelect) {
    selector.addEventListener("change", function (e) {
      let lang = e.target.value;
      //set the language in local storage
      localStorage.setItem("lang", lang);
      //load the language file and switch the language
      loadLangAndSwitch(`/languages/${lang}.json`);
    });
  }
}
