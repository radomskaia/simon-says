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

function toggleKeyboardState(isPressed, type, isTrusted = true) {
  elementsDOM.keyboardWrapper.classList.toggle(
    CSS_CLASSES.NON_INTERACTIVE,
    isPressed,
  );

  if (!isTrusted) {
    return;
  }

  if (type === "mouse") {
    gameState.isClicked = isPressed;
  } else {
    gameState.isPressed = isPressed;
  }
}

function keyDownHandler(event) {
  if (gameState.isPressed || !gameState.isPlaying || gameState.isClicked) {
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

  if (!elementsDOM.keyboards[gameState.level][keyPressed]) {
    return;
  }

  const keyElement = elementsDOM.keyboards[gameState.level][keyPressed];
  keyElement.classList.add(CSS_CLASSES.BUTTON_ACTIVE);

  toggleKeyboardState(true, "keyboard");

  const mouseDownEvent = new MouseEvent("mousedown");
  keyElement.dispatchEvent(mouseDownEvent);
}

function keyUpHandler(event) {
  if (keyPressed !== event.key.toLowerCase() || !gameState.isPressed) {
    return;
  }

  elementsDOM.keyboards[gameState.level][keyPressed].classList.remove(
    CSS_CLASSES.BUTTON_ACTIVE,
  );

  toggleKeyboardState(false, "keyboard");
}

function mouseDownHandler(event, char) {
  if (event.button !== 0 || (gameState.isPressed && event.isTrusted)) {
    return;
  }

  toggleKeyboardState(true, "mouse", event.isTrusted);

  gameLogic(char);
}

function mouseUpHandler(event) {
  if (!(gameState.isClicked && event.button === 0) || gameState.isPressed) {
    return;
  }
  toggleKeyboardState(false, "mouse");
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

  keyElement.addEventListener("mousedown", (event) => {
    mouseDownHandler(event, char);
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

export function keyboard() {
  renderKeyboard(elementsDOM);
  window.addEventListener("keydown", keyDownHandler);
  window.addEventListener("keyup", keyUpHandler);
  window.addEventListener("mouseup", mouseUpHandler);
}
