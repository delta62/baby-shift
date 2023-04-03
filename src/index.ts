import allEmoji from "./emoji";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .catch((err) => console.error("[SW] registration failed", err));
}

const HOUR_OF_DAY = 1000 * 60 * 60;

let emoji = document.getElementById("emoji")!;
let onCall = document.getElementById("name")!;
let time = document.getElementById("clock")!;
let until = document.getElementById("until")!;

let updateUI = () => {
  let now = new Date();
  let hour = now.getHours();
  let emojiSeed = Math.floor(now.getTime() / HOUR_OF_DAY);
  let whom;

  switch (hour) {
    case 0:
    case 1:
    case 4:
    case 5:
    case 20:
    case 21:
      whom = "Sam";
      break;
    case 2:
    case 3:
    case 6:
    case 7:
    case 22:
    case 23:
      whom = "Codi";
      break;
    default:
      whom = "You";
      break;
  }

  let untilHour = hour % 2 == 0 ? hour + 2 : hour + 1;
  let untilTime = new Date(now.getTime());
  untilTime.setHours(untilHour);
  untilTime.setMinutes(0);
  untilTime.setSeconds(0);

  onCall.textContent = whom;
  emoji.textContent = randomEmoji(emojiSeed);
  time.textContent = formatTime(now);
  until.textContent = `until ${formatTime(untilTime)}`;
};

let formatTime = (date: Date) => {
  let hh = `${date.getHours()}`.padStart(2, "0");
  let mm = `${date.getMinutes()}`.padStart(2, "0");
  let ss = `${date.getSeconds()}`.padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
};

let mulberry32 = (seed: number) => {
  return function () {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

let randomEmoji = (seed: number) => {
  let zeroToOne = mulberry32(seed)();
  let codePoint = Math.floor(zeroToOne * allEmoji.length);
  return allEmoji[codePoint];
};

updateUI();
setInterval(updateUI, 1000);
