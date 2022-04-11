//A function to read text from an uploaded file.
export function readText(file, callback) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    callback(reader.result);
  };
}

// Function to download data to a file
export function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
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

/**
 *
 * @param {String} selector - The text you want to find to put stuff before
 * @param {String} text - The text you are going to search through
 * @param {String} insertion - The thing you want to insert before the specified text
 * @returns String - The output
 */
export function insertBefore(selector, text, insertion) {
  let t = text.split(selector);
  return t.join(insertion + selector);
}
/**
 *
 * @param {String} selector - The text you want to find to replace
 * @param {String} text - The text you are going to search through
 * @param {String} insertion - The text that you want to replace the selector
 * @returns String - The output
 */
export function insertReplace(selector, text, insertion) {
  let t = text.split(selector);
  return t.join(insertion);
}

/**
 *
 * @param {String} time - this will convert a timestamp into milliseconds
 * @returns String - The output
 */
export function toMillis(time) {
  //split the time by :
  let t = time.split(":");
  //get the hours
  let hours = parseInt(t[0]);
  //get the minutes
  let minutes = parseInt(t[1]);
  //get the seconds
  let seconds = parseInt(t[2]);

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

/**
 *
 * @param {String} selector - The char or string that it will look for and use as a start and stop location for the open and close tag you specify
 * @param {String} text - The text you are going to search through
 * @param {String} openingTag - Once a opening tag (every second selector) is found, it will be replaced with this
 * @param {String} closingTag - Once a closing tag (every selector after an opening tag) is found, it will  be replaced with this
 * @param {Boolean} ignoreIfBackslash - This tells the function if it should ignore the tag if there is a backslash before it. Defaults to true.
 * @returns String - The output
 */
export function replaceHtml(
  selector,
  text,
  openingTag,
  closingTag,
  ignoreIfBackslash = true
) {
  //we will store 2 variables since we need to know how many times its been opened and closed.
  let openCount = 0,
    closeCount = 0;
  //the returning string
  let newText = "";
  //loop through each character of the input string
  for (let i = 0; i < text.length; i++) {
    //get each string chunk according to how long the selector is
    let char = text.substr(i, selector.length);
    //get the actual char, this wont change according to the selectors length
    let charAdding = text.charAt(i);
    //check if we found the selector in the string and that there is no backslash if we are looking for that
    if (
      char == selector &&
      (!ignoreIfBackslash || text.charAt(i - 1) != "\\")
    ) {
      //if the close count is equal to the open count that means we should open a new tag
      if (closeCount == openCount) {
        //overide the added character to the replacing opening tag
        charAdding = openingTag;
        //add one to the opening count
        openCount++;
      } else {
        //overide the added character to the replacing closing tag
        charAdding = closingTag;
        //add one to the closing count
        closeCount++;
      }
      //if we found the selector then skip over the next few chars(if the selector is more than 1 char)
      //so that we remove the selector from the string
      i += selector.length - 1;
    }
    //add the char to the string
    newText += charAdding;
  }
  //return the text
  return newText;
}
//Used for wrapping the selected area of a textArea in a tag
export function wrapSelection(txtarea, surrounder) {
  let selection = getSelection(txtarea);
  //If there is no selection dont run
  if (selection.start == selection.finish) return;
  //Set the text
  txtarea.value = txtarea.value
    .splice(selection.start, surrounder)
    .splice(selection.finish + surrounder.length, surrounder);
}

export function getSelection(txtarea) {
  var start = txtarea.selectionStart;
  // obtain the index of the last selected character
  var finish = txtarea.selectionEnd;

  //console.log(finish);
  return { start: start, finish: finish };
}

/**
 * {JSDoc}
 *
 * The splice() method changes the content of a string by removing a range of
 * characters and/or adding new characters.
 *
 * @this {String}
 * @param {number} start Index at which to start changing the string.
 * @param {number} delCount An integer indicating the number of old chars to remove.
 * @param {string} newSubStr The String that is spliced in.
 * @return {string} A new string with the spliced substring.
 */
String.prototype.splice = function (start, newSubStr) {
  return this.slice(0, start) + newSubStr + this.slice(start);
};
