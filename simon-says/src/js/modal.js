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
  const closeButton = createDOMElement({
    tagName: "button",
    classList: ["closeButton"],
    textContent: "❌",
  });
  const modalButton = createDOMElement({
    tagName: "button",
    classList: ["button", "actionButton"],
    textContent: "New Game",
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
  document.body.append(modal);

  closeButton.addEventListener("click", () => modal.close());
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
