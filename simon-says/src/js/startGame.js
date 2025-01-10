import { gameState } from "./newGame.js";

export function startGame() {
  gameState.isPlaying = true;
  gameState.elements.levelList.classList.add("no-pointer-events");
  Object.entries(gameState.elements.actionButtons).forEach(([key, value]) => {
    if (key === "start") {
      value.classList.add("display-none");
      return;
    }
    value.classList.remove("display-none");
  });
}
