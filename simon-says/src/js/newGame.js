export const gameState = {
  isEnd: false,
  roundCounter: 0,
  level: "ease",
  isPlaying: false,
  sequence: "",
  elements: {},
};

/**
 * Initializes the game by selecting a new word, rendering its letters, and displaying the hint.
 *  - An object containing the DOM elements used in the game.
 */
export function newGame() {
  gameState.elements.levelInputs[gameState.level].checked = true;
  gameState.roundCounter = 0;
  gameState.elements.roundCounter = gameState.roundCounter;
  gameState.elements.levelList.classList.remove("no-pointer-events");
  Object.entries(gameState.elements.actionButtons).forEach(([key, value]) => {
    if (key === "start") {
      value.classList.remove("display-none");
      return;
    }
    value.classList.add("display-none");
  });
}
