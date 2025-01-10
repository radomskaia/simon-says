import { keyboard } from "@/js/keyboard.js";

export const gameState = {
  isEnd: false,
  roundCounter: 0,
  level: "ease",
  isPlaying: false,
  sequence: "",
};

/**
 * Initializes the game by selecting a new word, rendering its letters, and displaying the hint.
 * @param {Object} elements - An object containing the DOM elements used in the game.
 */
export function startGame(elements) {
  elements.levelInputs[gameState.level].checked = true;
  gameState.roundCounter = 0;
  elements.roundCounter = gameState.roundCounter;
}
