import { CSS_CLASSES, GAME_MESSAGES } from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";
import { elementsDOM } from "@/js/elementsDOM.js";
import { generateSequence } from "@/js/sequence.js";
import { resetGame } from "@/js/utils.js";

export function startRound() {
  gameState.roundCounter++;
  gameState.isMistake = false;
  elementsDOM.levelList.classList.add(CSS_CLASSES.NON_INTERACTIVE);
  elementsDOM.actionButtons.repeat.classList.remove(
    CSS_CLASSES.HIGHLIGHT_BUTTON,
  );
  elementsDOM.outputField.textContent = GAME_MESSAGES.SIMON_SAYS;

  resetGame(false);

  generateSequence();
}
