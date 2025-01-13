import { disabledKeyboard } from "@/js/startGame.js";
import {
  CSS_CLASSES,
  GAME_MESSAGES,
  NUMBER_OF_ROUND,
} from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";

function showModalWindow() {
  gameState.elements.modal.text.textContent =
    gameState.sequenceArray.length === 0
      ? GAME_MESSAGES.WIN
      : GAME_MESSAGES.LOSE;
  gameState.elements.modal.word.textContent = gameState.sequence.toUpperCase();
  gameState.elements.modal.modal.showModal();
}

function checkGameOver() {
  if (gameState.sequenceArray.length !== 0) {
    return;
  }
  gameState.isPlaying = false;
  if (gameState.roundCounter !== NUMBER_OF_ROUND) {
    disabledKeyboard(true);
    gameState.elements.actionButtons.next.classList.remove(CSS_CLASSES.HIDDEN);
    gameState.elements.actionButtons.repeat.classList.add(CSS_CLASSES.HIDDEN);
    gameState.elements.outputField.textContent = GAME_MESSAGES.WIN_ROUND;
    gameState.elements.outputField.classList.add(CSS_CLASSES.WIN_ROUND);
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
    gameState.elements.actionButtons.repeat.classList.add(
      CSS_CLASSES.HIGHLIGHT_BUTTON,
    );
    gameState.elements.outputField.textContent = GAME_MESSAGES.MISTAKE;
    gameState.elements.outputField.classList.add(CSS_CLASSES.MISTAKE);
  } else {
    gameState.elements.outputField.textContent += pressedChar;
    gameState.sequenceArray.shift();
  }
  checkGameOver();
}
