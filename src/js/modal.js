import { createActionButton, createDOMElement } from "@/js/utils.js";
import { newGame } from "@/js/newGame.js";
import { elementsDOM } from "@/js/elementsDOM.js";
import { gameState } from "@/js/gameState.js";
import { GAME_MESSAGES } from "@/js/gameConstants.js";

export function showModalWindow() {
  elementsDOM.modal.text.textContent =
    gameState.sequenceArray.length === 0
      ? GAME_MESSAGES.WIN
      : GAME_MESSAGES.LOSE;
  elementsDOM.modal.word.textContent = gameState.sequence.toUpperCase();
  elementsDOM.modal.modal.showModal();
}

export function createModal() {
  const modal = createDOMElement({
    tagName: "dialog",
    classList: [
      "modal",
      "flex",
      "flex--column",
      "flex--align-center",
      "flex_gap-20",
    ],
  });
  const closeButton = createDOMElement({
    tagName: "button",
    classList: ["closeButton"],
    textContent: "❌",
  });
  const modalButton = createActionButton("newGame", () => {
    modal.close();
    newGame();
  });

  const modalText = createDOMElement({
    tagName: "p",
  });
  const modalText2 = createDOMElement({
    tagName: "p",
    textContent: "Simon says: ",
  });
  const secretWord = createDOMElement({
    tagName: "strong",
  });
  modalText2.append(secretWord);

  modal.append(closeButton, modalText, modalText2, modalButton);

  closeButton.addEventListener("click", () => modal.close());
  modalButton.addEventListener("click", () => {
    modal.close();
    newGame();
  });

  return {
    modal: modal,
    text: modalText,
    word: secretWord,
  };
}
