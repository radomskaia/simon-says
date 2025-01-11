import { gameState } from "./newGame.js";
import { disabledKeyboard } from "@/js/startGame.js";

const MAX_ROUND = 5;
const GAME_MESSAGES = {
  WIN: "YOU WIN",
  LOSE: "GAME OVER",
};

function showModalWindow() {
  console.log(gameState.elements.modal);
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
  if (gameState.roundCounter !== MAX_ROUND) {
    console.log("Next");
    disabledKeyboard(true);
    gameState.elements.actionButtons.next.disabled = false;
    //  @todo активна кнопка NEXT, неактивно все
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
    console.log("Game Over");
    console.log("Game Over");
    showModalWindow();
  }
  if (!isGuessed) {
    gameState.isMistake = true;
    console.log("Mistake");
    //  @todo цветовое выделение и/или сообщение об ошибке
  } else {
    gameState.elements.outputField.textContent += pressedChar;
    gameState.sequenceArray.shift();
  }
  checkGameOver();
}
