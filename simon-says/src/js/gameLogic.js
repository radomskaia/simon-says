import {
  CSS_CLASSES,
  GAME_MESSAGES,
  NUMBER_OF_ROUND,
  roundStatus,
} from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";
import { elementsDOM } from "@/js/elementsDOM.js";
import { disabledKeyboard } from "@/js/utils.js";
import { showModalWindow } from "@/js/modal.js";

function updateRoundStatusUI(isMistake) {
  const repeatClass = isMistake
    ? CSS_CLASSES.HIGHLIGHT_BUTTON
    : CSS_CLASSES.HIDDEN;
  const result = isMistake ? roundStatus.mistake : roundStatus.win;
  if (isMistake) {
    gameState.isMistake = isMistake;
  } else {
    elementsDOM.actionButtons.next.classList.remove(CSS_CLASSES.HIDDEN);
  }

  elementsDOM.outputField.textContent = GAME_MESSAGES[result];
  elementsDOM.outputField.classList.add(CSS_CLASSES[result]);
  elementsDOM.actionButtons.repeat.classList.add(repeatClass);
  disabledKeyboard(true);
}

function checkGameOver() {
  if (gameState.sequenceArray.length !== 0) {
    return;
  }
  gameState.isPlaying = false;
  if (gameState.roundCounter !== NUMBER_OF_ROUND) {
    updateRoundStatusUI(false);
  } else {
    showModalWindow();
  }
}

/**
 * Handles the core game logic: checks the entered character, updates the game state,
 * and ends the game if necessary.
 - The button corresponding to the entered character.
 */
export function gameLogic(pressedChar) {
  const isGuessed = pressedChar === gameState.sequenceArray[0];
  if (!isGuessed && gameState.isMistake) {
    showModalWindow();
  }
  if (!isGuessed) {
    updateRoundStatusUI(true);
  } else {
    elementsDOM.outputField.textContent += pressedChar;
    gameState.sequenceArray.shift();
  }
  checkGameOver();
}
