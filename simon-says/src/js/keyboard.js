import { createDOMElement } from "./utils.js";
import { gameLogic } from "./gameLogic.js";
import { gameState } from "./startGame.js";

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

function keyDownHandler(event, keyboardKeys, keyboardWrapper) {
  if (gameState.isEnd || keyPressed.isPressed) {
    return;
  }
  const key = event.key.toLowerCase();
  if (key >= RUSSIAN_LAYOUT.firstChar && key <= RUSSIAN_LAYOUT.lastChar) {
    console.log("Change the keyboard layout, please");
    return;
  }
  if (!keyboardKeys[key]) {
    return;
  }
  keyPressed.isPressed = true;
  keyPressed.key = key;
  keyboardKeys[key].classList.add("button-keyboard-active");
  keyboardWrapper.classList.add("no-pointer-events");
  const newEvent = new MouseEvent("click");
  keyboardKeys[key].dispatchEvent(newEvent);
}

function keyUpHandler(event, keyboardKeys, keyboardWrapper) {
  if (keyPressed.key !== event.key.toLowerCase() || !keyPressed.isPressed) {
    return;
  }
  keyPressed.isPressed = false;
  keyboardKeys[keyPressed.key].classList.remove("button-keyboard-active");
  keyboardWrapper.classList.remove("no-pointer-events");
}

function renderKey(charCode, elements, keyboardType) {
  const char = String.fromCharCode(charCode);
  const key = createDOMElement({
    tagName: "button",
    classList: ["button", "button-keyboard", keyboardType],
  });
  const keyText = createDOMElement({
    tagName: "p",
    classList: ["keyboard-text"],
    textContent: char,
  });
  key.append(keyText);
  elements.keyboardWrapper.append(key);
  elements.keyboardKeys[char] = key;
  key.addEventListener("click", (event) => {
    clickHandler(key, elements, char, event.isTrusted);
  });
  return key;
}

/**
 * Renders the keyboard and adds event listeners for each key.
 * @param {Object} elements - An object containing the DOM elements used in the game.
 */
export function keyboard(elements) {
  elements.keyboardKeys = {};
  for (
    let i = NUMBER_LAYOUT.firstCharCode;
    i <= NUMBER_LAYOUT.lastCharCode;
    i++
  ) {
    renderKey(i, elements, "numbers");
  }
  for (
    let i = ENGLISH_LAYOUT.firstCharCode;
    i <= ENGLISH_LAYOUT.lastCharCode;
    i++
  ) {
    renderKey(i, elements, "letters");
  }
  window.addEventListener("keydown", (event) => {
    keyDownHandler(event, elements.keyboardKeys, elements.keyboardWrapper);
  });
  window.addEventListener("keyup", (event) => {
    keyUpHandler(event, elements.keyboardKeys, elements.keyboardWrapper);
  });
}
