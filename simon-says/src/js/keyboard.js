import { createDOMElement } from "./utils.js";
import { gameLogic } from "@/js/gameLogic.js";
import {
  CSS_CLASSES,
  ENGLISH_LAYOUT,
  GAME_MESSAGES,
  LEVELS,
  NUMBER_LAYOUT,
  RUSSIAN_LAYOUT,
} from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";
import { elementsDOM } from "@/js/elementsDOM.js";

let keyPressed;

function clickHandler(char, isTrusted) {
  if (gameState.isPressed && isTrusted) {
    return;
  }
  gameLogic(char);
}

function keyDownHandler(event, keyboards, keyboardWrapper) {
  if (gameState.isPressed || !gameState.isPlaying) {
    return;
  }

  keyPressed = event.key.toLowerCase();

  if (
    keyPressed >= RUSSIAN_LAYOUT.firstChar &&
    keyPressed <= RUSSIAN_LAYOUT.lastChar
  ) {
    console.log(GAME_MESSAGES.CHANGE_LAYOUT);
    return;
  }

  if (!keyboards[gameState.level][keyPressed]) {
    return;
  }

  gameState.isPressed = true;
  const keyElement = keyboards[gameState.level][keyPressed];

  keyElement.classList.add(CSS_CLASSES.BUTTON_ACTIVE);
  keyboardWrapper.classList.add(CSS_CLASSES.NON_INTERACTIVE);

  keyElement.click();
}

function keyUpHandler(event, keyboards, keyboardWrapper) {
  if (keyPressed !== event.key.toLowerCase() || !gameState.isPressed) {
    return;
  }

  gameState.isPressed = false;
  keyboards[gameState.level][keyPressed].classList.remove(
    CSS_CLASSES.BUTTON_ACTIVE,
  );
  keyboardWrapper.classList.remove(CSS_CLASSES.NON_INTERACTIVE);
}

function renderKey(charCode, keyboadElements, keyboardType) {
  const char = String.fromCharCode(charCode);
  const keyElement = createDOMElement({
    tagName: "button",
    classList: ["button", "buttonKeyboard"],
  });
  const keyText = createDOMElement({
    tagName: "p",
    classList: ["keyboardText"],
    textContent: char,
  });

  keyElement.append(keyText);
  keyboadElements[LEVELS[2]][char] = keyElement;
  keyboadElements[keyboardType][char] = keyElement;
  keyElement.addEventListener("click", (event) => {
    clickHandler(char, event.isTrusted);
  });

  return keyElement;
}

function renderKeyboard(elements) {
  const wrappers = {};
  wrappers.numbers = createDOMElement({
    classList: ["numbers", "flex", "flex--wrap", "flex_gap-10"],
  });
  wrappers.letters = createDOMElement({
    classList: ["letters", "flex", "flex--wrap", "flex_gap-10"],
  });
  elements.keyboardWrapper.append(wrappers.numbers, wrappers.letters);

  const layouts = [
    { range: NUMBER_LAYOUT, wrapper: wrappers.numbers, level: LEVELS[0] },
    { range: ENGLISH_LAYOUT, wrapper: wrappers.letters, level: LEVELS[1] },
  ];

  layouts.forEach((layout) => {
    for (
      let i = layout.range.firstCharCode;
      i <= layout.range.lastCharCode;
      i++
    ) {
      const keyElement = renderKey(i, elements.keyboards, layout.level);
      layout.wrapper.append(keyElement);
    }
  });
}

/**
 * Renders the keyboard and adds event listeners for each key.
 *  - An object containing the DOM elements used in the game.
 */
export function keyboard() {
  renderKeyboard(elementsDOM);
  window.addEventListener("keydown", (event) => {
    keyDownHandler(event, elementsDOM.keyboards, elementsDOM.keyboardWrapper);
  });
  window.addEventListener("keyup", (event) => {
    keyUpHandler(event, elementsDOM.keyboards, elementsDOM.keyboardWrapper);
  });
}
