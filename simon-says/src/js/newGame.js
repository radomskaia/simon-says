import { disabledKeyboard } from "@/js/startGame.js";

export const gameState = {
  isEnd: false,
  roundCounter: 0,
  level: "easy",
  isPlaying: false,
  sequence: "",
  elements: {},
  sequenceArray: [],
};

/**
 * Initializes the game by selecting a new word, rendering its letters, and displaying the hint.
 *  - An object containing the DOM elements used in the game.
 */
export function newGame() {
  const elements = gameState.elements;
  elements.levelInputs[gameState.level].checked = true;
  gameState.roundCounter = 0;
  gameState.sequenceArray = [];
  gameState.elements.outputField.classList.remove("outputFieldMistake");
  gameState.elements.outputField.classList.remove("outputFieldFinish");
  elements.roundCounter.textContent = gameState.roundCounter;
  elements.outputField.textContent = "Switch to English keyboard layout";
  elements.levelList.classList.remove("no-pointer-events");
  const repeatButton = elements.actionButtons.repeat;
  repeatButton.disabled = false;
  disabledKeyboard(true);
  Object.entries(elements.actionButtons).forEach(([key, value]) => {
    if (key === "start") {
      value.classList.remove("display-none");
      return;
    }
    value.classList.add("display-none");
  });
}
