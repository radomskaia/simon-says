import { createDOMElement } from "@/js/utils.js";
import { gameState, newGame } from "@/js/newGame.js";

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
  const modalButton = createDOMElement({
    tagName: "button",
    classList: ["button", "actionButton"],
    textContent: "Play again",
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

  modal.append(modalText, modalText2, modalButton);
  document.body.append(modal);

  modalButton.addEventListener("click", () => {
    modal.close();
    newGame();
  });

  gameState.elements.modal = {
    modal: modal,
    text: modalText,
    word: secretWord,
  };

  return modal;
}
