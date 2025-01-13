import { disabledKeyboard } from "@/js/startGame.js";
import { CSS_CLASSES, GAME_MESSAGES } from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";
import { elementsDOM } from "@/js/elementsDOM.js";

/**
 * Initializes the game by selecting a new word, rendering its letters, and displaying the hint.
 *  - An object containing the DOM elements used in the game.
 */
export function newGame() {
  elementsDOM.levelInputs[gameState.level].checked = true;
  gameState.roundCounter = 0;
  gameState.sequenceArray = [];
  elementsDOM.outputField.classList.remove(CSS_CLASSES.MISTAKE);
  elementsDOM.outputField.classList.remove(CSS_CLASSES.WIN_ROUND);
  elementsDOM.roundCounter.textContent = gameState.roundCounter;
  elementsDOM.outputField.textContent = GAME_MESSAGES.START;
  elementsDOM.levelList.classList.remove(CSS_CLASSES.NON_INTERACTIVE);
  const repeatButton = elementsDOM.actionButtons.repeat;
  repeatButton.disabled = false;
  disabledKeyboard(true);
  Object.entries(elementsDOM.actionButtons).forEach(([key, value]) => {
    if (key === "start") {
      value.classList.remove(CSS_CLASSES.HIDDEN);
      return;
    }
    value.classList.add(CSS_CLASSES.HIDDEN);
  });
}
