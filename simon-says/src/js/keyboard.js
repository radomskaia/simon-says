import { createDOMElement } from "./utils.js";
import { gameLogic } from "@/js/gameLogic.js";
import { CSS_CLASSES, GAME_MESSAGES } from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";

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
  gameLogic(char);
}

let keyPressed = { isPressed: false };

function keyDownHandler(event, keyboards, keyboardWrapper) {
  if (gameState.isEnd || keyPressed.isPressed || !gameState.isPlaying) {
    return;
  }
  const key = event.key.toLowerCase();
  if (key >= RUSSIAN_LAYOUT.firstChar && key <= RUSSIAN_LAYOUT.lastChar) {
    console.log(GAME_MESSAGES.CHANGE_LAYOUT);
    return;
  }
  if (!keyboards[gameState.level][key]) {
    return;
  }
  keyPressed.isPressed = true;
  keyPressed.key = key;
  keyboards[gameState.level][key].classList.add(CSS_CLASSES.BUTTON_ACTIVE);
  keyboardWrapper.classList.add(CSS_CLASSES.NON_INTERACTIVE);
  const newEvent = new MouseEvent("click");
  keyboards[gameState.level][key].dispatchEvent(newEvent);
}

function keyUpHandler(event, keyboards, keyboardWrapper) {
  if (keyPressed.key !== event.key.toLowerCase() || !keyPressed.isPressed) {
    return;
  }
  keyPressed.isPressed = false;
  keyboards[gameState.level][keyPressed.key].classList.remove(
    CSS_CLASSES.BUTTON_ACTIVE,
  );
  keyboardWrapper.classList.remove(CSS_CLASSES.NON_INTERACTIVE);
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
  wrappers[keyboardType === "easy" ? "numbers" : "letters"].append(key);
  elements.keyboards.hard[char] = key;
  elements.keyboards[keyboardType][char] = key;
  key.addEventListener("click", (event) => {
    clickHandler(key, elements, char, event.isTrusted);
  });
  return key;
}

function renderKeyboard(elements) {
  elements.keyboards = {};
  elements.keyboards.easy = {};
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
    renderKey(i, elements, wrappers, "easy");
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
 *  - An object containing the DOM elements used in the game.
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
