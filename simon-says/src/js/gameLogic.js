import { disabledKeyboard } from "@/js/startGame.js";
import {
  CSS_CLASSES,
  GAME_MESSAGES,
  NUMBER_OF_ROUND,
} from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";
import { elementsDOM } from "@/js/elementsDOM.js";

function showModalWindow() {
  elementsDOM.modal.text.textContent =
    gameState.sequenceArray.length === 0
      ? GAME_MESSAGES.WIN
      : GAME_MESSAGES.LOSE;
  elementsDOM.modal.word.textContent = gameState.sequence.toUpperCase();
  elementsDOM.modal.modal.showModal();
}

function checkGameOver() {
  console.log(elementsDOM);
  if (gameState.sequenceArray.length !== 0) {
    return;
  }
  gameState.isPlaying = false;
  if (gameState.roundCounter !== NUMBER_OF_ROUND) {
    disabledKeyboard(true);
    elementsDOM.actionButtons.next.classList.remove(CSS_CLASSES.HIDDEN);
    elementsDOM.actionButtons.repeat.classList.add(CSS_CLASSES.HIDDEN);
    elementsDOM.outputField.textContent = GAME_MESSAGES.WIN_ROUND;
    elementsDOM.outputField.classList.add(CSS_CLASSES.WIN_ROUND);
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
    gameState.isMistake = true;
    disabledKeyboard(true);
    elementsDOM.actionButtons.repeat.classList.add(
      CSS_CLASSES.HIGHLIGHT_BUTTON,
    );
    elementsDOM.outputField.textContent = GAME_MESSAGES.MISTAKE;
    elementsDOM.outputField.classList.add(CSS_CLASSES.MISTAKE);
  } else {
    elementsDOM.outputField.textContent += pressedChar;
    gameState.sequenceArray.shift();
  }
  checkGameOver();
}
