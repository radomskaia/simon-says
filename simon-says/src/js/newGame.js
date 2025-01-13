import { CSS_CLASSES, GAME_MESSAGES } from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";
import { elementsDOM } from "@/js/elementsDOM.js";
import { disabledButtons, resetGame } from "@/js/utils.js";

/**
 * Initializes the game by selecting a new word, rendering its letters, and displaying the hint.
 *  - An object containing the DOM elements used in the game.
 */
export function newGame() {
  gameState.roundCounter = 0;
  elementsDOM.roundWrapper.classList.add(CSS_CLASSES.OPACITY_0);
  elementsDOM.levelButtons[gameState.level].checked = true;
  gameState.sequenceArray = [];
  elementsDOM.outputField.textContent = GAME_MESSAGES.START;
  disabledButtons(false, [elementsDOM.levelButtons]);
  gameState.isPlaying = false;
  disabledButtons(true, [elementsDOM.keyboards.hard]);
  resetGame(true);
}
