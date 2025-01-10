import { createDOMElement } from "./utils.js";
//import { gameLogic } from "./gameLogic.js";
import { gameState } from "./newGame.js";

const RUSSIAN_LAYOUT = { firstChar: "а", lastChar: "я" };
const NUMBER_LAYOUT = {
  firstCharCode: "0".charCodeAt(0),
  lastCharCode: "9".charCodeAt(0),
};
const ENGLISH_LAYOUT = {
  firstCharCode: "a".charCodeAt(0),
  lastCharCode: "z".charCodeAt(0),
};

function clickHandler(key, elements, char, isTrusted) {
  if (keyPressed.isPressed && isTrusted) {
    return;
  }

  console.log("clicked", char);
  //gameLogic(elements, char, key);
}

let keyPressed = { isPressed: false };

function keyDownHandler(event, keyboards, keyboardWrapper) {
  if (gameState.isEnd || keyPressed.isPressed) {
    return;
  }
  const key = event.key.toLowerCase();
  if (key >= RUSSIAN_LAYOUT.firstChar && key <= RUSSIAN_LAYOUT.lastChar) {
    console.log("Change the keyboard layout, please");
    return;
  }
  if (!keyboards[gameState.level][key]) {
    return;
  }
  keyPressed.isPressed = true;
  keyPressed.key = key;
  keyboards[gameState.level][key].classList.add("buttonKeyboardActive");
  keyboardWrapper.classList.add("no-pointer-events");
  const newEvent = new MouseEvent("click");
  keyboards[gameState.level][key].dispatchEvent(newEvent);
}

function keyUpHandler(event, keyboards, keyboardWrapper) {
  if (keyPressed.key !== event.key.toLowerCase() || !keyPressed.isPressed) {
    return;
  }
  keyPressed.isPressed = false;
  keyboards[gameState.level][keyPressed.key].classList.remove(
    "buttonKeyboardActive",
  );
  keyboardWrapper.classList.remove("no-pointer-events");
}

function renderKey(charCode, elements, wrappers, keyboardType) {
  const char = String.fromCharCode(charCode);
  const key = createDOMElement({
    tagName: "button",
    classList: ["button", "buttonKeyboard"],
  });
  const keyText = createDOMElement({
    tagName: "p",
    classList: ["keyboardText"],
    textContent: char,
  });
  key.append(keyText);
  wrappers[keyboardType === "ease" ? "numbers" : "letters"].append(key);
  elements.keyboards.hard[char] = key;
  elements.keyboards[keyboardType][char] = key;
  key.addEventListener("click", (event) => {
    clickHandler(key, elements, char, event.isTrusted);
  });
  return key;
}

function renderKeyboard(elements) {
  elements.keyboardKeys = {};
  elements.keyboards = {};
  elements.keyboards.ease = {};
  elements.keyboards.medium = {};
  elements.keyboards.hard = {};
  const wrappers = {};
  wrappers.numbers = createDOMElement({
    classList: ["numbers", "flex", "flex--wrap", "flex_gap-10"],
  });
  wrappers.letters = createDOMElement({
    classList: ["letters", "flex", "flex--wrap", "flex_gap-10"],
  });
  elements.keyboardWrapper.append(wrappers.numbers, wrappers.letters);
  for (
    let i = NUMBER_LAYOUT.firstCharCode;
    i <= NUMBER_LAYOUT.lastCharCode;
    i++
  ) {
    renderKey(i, elements, wrappers, "ease");
  }
  for (
    let i = ENGLISH_LAYOUT.firstCharCode;
    i <= ENGLISH_LAYOUT.lastCharCode;
    i++
  ) {
    renderKey(i, elements, wrappers, "medium");
  }
}

/**
 * Renders the keyboard and adds event listeners for each key.
 * @param {Object} elements - An object containing the DOM elements used in the game.
 */
export function keyboard() {
  renderKeyboard(gameState.elements);
  window.addEventListener("keydown", (event) => {
    keyDownHandler(
      event,
      gameState.elements.keyboards,
      gameState.elements.keyboardWrapper,
    );
  });
  window.addEventListener("keyup", (event) => {
    keyUpHandler(
      event,
      gameState.elements.keyboards,
      gameState.elements.keyboardWrapper,
    );
  });
}
