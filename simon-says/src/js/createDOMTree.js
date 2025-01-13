import { createDOMElement } from "./utils.js";
import { createLevelList } from "@/js/levelTabs.js";
import { createActionButtons } from "@/js/actionButtons.js";
import { createModal } from "@/js/modal.js";
import { GAME_MESSAGES, LEVELS } from "@/js/gameConstants.js";
import { elementsDOM } from "@/js/elementsDOM.js";

/**
 * Creates and appends the DOM tree for the game interface.
 * Initializes event listeners and returns references to the essential elements.
 *  An object containing references to the created DOM elements.
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
    classList: ["flex", "flex--align-justify-center", "flex_gap-10", "flexDiv"],
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

  allElements.levelList = createLevelList(LEVELS);

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
    textContent: GAME_MESSAGES.START,
  });

  allElements.buttonWrapper = createDOMElement({
    classList: ["flex", "flex_gap-20", "flex--align-justify-center"],
  });

  allElements.actionButtons = createActionButtons();
  allElements.buttonWrapper.append(...Object.values(allElements.actionButtons));

  allElements.flexDiv.append(allElements.outputField, allElements.roundWrapper);

  allElements.container.append(
    allElements.headerPrimary,
    allElements.flexDiv,
    allElements.levelList,
    allElements.keyboardWrapper,
    allElements.buttonWrapper,
  );

  allElements.modal = createModal();
  document.body.append(allElements.container, allElements.modal.modal);

  elementsDOM.keyboardWrapper = allElements.keyboardWrapper;
  elementsDOM.roundCounter = allElements.roundCounter;
  elementsDOM.roundWrapper = allElements.roundWrapper;
  elementsDOM.actionButtons = allElements.actionButtons;
  elementsDOM.modal = allElements.modal;
  elementsDOM.outputField = allElements.outputField;
  elementsDOM.buttonWrapper = allElements.buttonWrapper;
}
