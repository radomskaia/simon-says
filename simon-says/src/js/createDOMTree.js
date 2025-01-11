import { createDOMElement } from "./utils.js";
import { createLevelList } from "@/js/levelTabs.js";
import { gameState, newGame } from "@/js/newGame.js";
import { startGame } from "@/js/startGame.js";
import { createModal } from "@/js/modal.js";

/**
 * Creates and appends the DOM tree for the game interface.
 * Initializes event listeners and returns references to the essential elements.
 * @returns {Object} - An object containing references to the created DOM elements.
 */
export function createDOMTree() {
  const allElements = {};

  allElements.container = createDOMElement({
    classList: [
      "container",
      "flex",
      "flex--column",
      "flex--align-justify-center",
      "flex_gap-30",
    ],
  });

  allElements.headerPrimary = createDOMElement({
    tagName: "h1",
    textContent: "simon says",
    classList: ["header-primary"],
  });

  allElements.flexDiv = createDOMElement({
    classList: ["flex", "flex--align-justify-center", "flex_gap-10"],
  });

  allElements.roundWrapper = createDOMElement({
    tagName: "p",
    textContent: "Round: ",
    classList: ["roundWrapper"],
  });
  allElements.roundCounter = createDOMElement({
    tagName: "span",
    textContent: "0",
    classList: ["counter-text"],
  });
  allElements.roundText = createDOMElement({
    tagName: "span",
    textContent: " / 5",
    classList: ["counter-text"],
  });

  allElements.roundWrapper.append(
    allElements.roundCounter,
    allElements.roundText,
  );

  allElements.levelList = createLevelList(
    ["ease", "medium", "hard"],
    allElements,
  );

  allElements.keyboardWrapper = createDOMElement({
    classList: [
      "flex",
      "flex--wrap",
      "flex_gap-10",
      "keyboardWrapper",
      "flex--align-justify-center",
    ],
  });

  allElements.outputField = createDOMElement({
    tagName: "p",
    classList: ["outputField"],
    textContent: "Make sure the English keyboard layout is enabled.",
  });
  allElements.actionButtons = {};

  allElements.actionButtons.start = createDOMElement({
    tagName: "button",
    classList: ["button", "actionButton"],
    textContent: "start",
  });
  allElements.actionButtons.start.addEventListener("click", startGame);
  allElements.actionButtons.repeat = createDOMElement({
    tagName: "button",
    classList: ["button", "actionButton"],
    textContent: "Repeat the sequence",
  });
  allElements.actionButtons.newGame = createDOMElement({
    tagName: "button",
    classList: ["button", "actionButton"],
    textContent: "new game",
  });
  allElements.actionButtons.newGame.addEventListener("click", newGame);
  allElements.actionButtons.next = createDOMElement({
    tagName: "button",
    classList: ["button", "actionButton", "actionButtonHighlight"],
    textContent: "next",
  });
  allElements.actionButtons.next.addEventListener("click", startGame);
  allElements.buttonWrapper = createDOMElement({
    classList: ["flex", "flex_gap-20"],
  });

  allElements.buttonWrapper.append(
    allElements.actionButtons.start,
    allElements.actionButtons.newGame,
    allElements.actionButtons.next,
    allElements.actionButtons.repeat,
  );

  allElements.flexDiv.append(allElements.outputField, allElements.roundWrapper);

  allElements.container.append(
    allElements.headerPrimary,
    allElements.flexDiv,
    allElements.levelList,
    allElements.keyboardWrapper,
    allElements.buttonWrapper,
  );

  document.body.append(allElements.container, createModal());
  console.log("modal", gameState.elements.modal);

  gameState.elements = {
    keyboardWrapper: allElements.keyboardWrapper,
    roundCounter: allElements.roundCounter,
    actionButtons: allElements.actionButtons,
    levelList: allElements.levelList,
    levelInputs: allElements.levelInputs,
    outputField: allElements.outputField,
    modal: gameState.elements.modal,
    buttonWrapper: allElements.buttonWrapper,
  };
}
