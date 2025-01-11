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
    disabledKeyboard(true);
    gameState.elements.actionButtons.next.classList.remove("display-none");
    gameState.elements.actionButtons.repeat.classList.add("display-none");
    gameState.elements.outputField.textContent = "You passed the round! =)";
    gameState.elements.outputField.classList.add("outputFieldFinish");
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
    showModalWindow();
  }
  if (!isGuessed) {
    gameState.isMistake = true;
    console.log("Mistake");
    disabledKeyboard(true);
    gameState.elements.actionButtons.repeat.classList.add(
      "actionButtonHighlight",
    );
    gameState.elements.outputField.textContent = "You are wrong! =(";
    gameState.elements.outputField.classList.add("outputFieldMistake");
  } else {
    gameState.elements.outputField.textContent += pressedChar;
    gameState.sequenceArray.shift();
  }
  checkGameOver();
}
