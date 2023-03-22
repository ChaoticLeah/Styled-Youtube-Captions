import { data, type dataType } from "./captionDataManager";

let dat: dataType;
data.subscribe((value) => {
  dat = value;
});

function toMillis(time: string) {
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

function exportToYtt() {
  let captions = [];
  let captionStypes = [];

  for (const captionIndex in dat.captions) {
    const captionElem = dat.captions[captionIndex];
    const startTime = toMillis(captionElem.startTime);
    const endTime = toMillis(captionElem.endTime);
    //ADD each styled bit here as a <s>
    const captionFragment = `<p p="" t="${startTime}" d="${endTime - startTime}">​<s p="1">${captionElem.value}</s></p>`;
  }

  const file = `<?xml version="1.0" encoding="utf-8" ?>
    <timedtext format="3">
    <head>

    </head>
    <body>

    </body>
    </timedtext>`;
}

export { exportToYtt };
