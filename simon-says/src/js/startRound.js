import { CSS_CLASSES, GAME_MESSAGES } from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";
import { elementsDOM } from "@/js/elementsDOM.js";
import { generateSequence } from "@/js/sequence.js";
import { disabledButtons, resetGame } from "@/js/utils.js";

export function startRound() {
  gameState.roundCounter++;
  if (gameState.roundCounter === 1) {
    disabledButtons(true, [elementsDOM.levelButtons]);
    elementsDOM.roundWrapper.classList.remove(CSS_CLASSES.OPACITY_0);
  }
  resetGame(false);
  disabledButtons(true, [
    elementsDOM.keyboards[gameState.level],
    elementsDOM.actionButtons,
  ]);
  elementsDOM.actionButtons.repeat.classList.remove(
    CSS_CLASSES.HIGHLIGHT_BUTTON,
  );

  elementsDOM.outputField.textContent = GAME_MESSAGES.SIMON_SAYS;

  generateSequence();
}
