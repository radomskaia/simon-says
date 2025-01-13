import { disabledKeyboard } from "@/js/startGame.js";
import { CSS_CLASSES, GAME_MESSAGES } from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";

/**
 * Initializes the game by selecting a new word, rendering its letters, and displaying the hint.
 *  - An object containing the DOM elements used in the game.
 */
export function newGame() {
  const elements = gameState.elements;
  elements.levelInputs[gameState.level].checked = true;
  gameState.roundCounter = 0;
  gameState.sequenceArray = [];
  gameState.elements.outputField.classList.remove(CSS_CLASSES.MISTAKE);
  gameState.elements.outputField.classList.remove(CSS_CLASSES.WIN_ROUND);
  elements.roundCounter.textContent = gameState.roundCounter;
  elements.outputField.textContent = GAME_MESSAGES.START;
  elements.levelList.classList.remove(CSS_CLASSES.NON_INTERACTIVE);
  const repeatButton = elements.actionButtons.repeat;
  repeatButton.disabled = false;
  disabledKeyboard(true);
  Object.entries(elements.actionButtons).forEach(([key, value]) => {
    if (key === "start") {
      value.classList.remove(CSS_CLASSES.HIDDEN);
      return;
    }
    value.classList.add(CSS_CLASSES.HIDDEN);
  });
}
