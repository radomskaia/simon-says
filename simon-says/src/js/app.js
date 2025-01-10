import { createDOMTree } from "./createDOMTree.js";
import { keyboard } from "./keyboard.js";
import { newGame } from "./newGame.js";

export function app() {
  createDOMTree();
  newGame();
  keyboard();
}
