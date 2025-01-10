import { createDOMElement } from "./utils.js";
import { createLevelList } from "@/js/levelTabs.js";

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
      "flex_gap-48",
    ],
  });

  allElements.headerPrimary = createDOMElement({
    tagName: "h1",
    textContent: "simon says",
    classList: ["header-primary"],
  });

  allElements.roundWrapper = createDOMElement({
    tagName: "p",
    textContent: "Round: ",
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

  allElements.levelList = createLevelList(["ease", "medium", "hard"]);

  allElements.roundWrapper.append(
    allElements.roundCounter,
    allElements.roundText,
  );

  allElements.keyboardWrapper = createDOMElement({
    classList: ["flex", "flex--wrap", "flex_gap-10", "keyboardWrapper"],
  });

  allElements.inputField = createDOMElement({
    tagName: "input",
    attributes: {
      type: "text",
      value: "Make sure the English keyboard layout is enabled.",
      readonly: true,
    },
  });
  allElements.buttons = {};

  allElements.buttons.start = createDOMElement({
    tagName: "button",
    classList: ["button"],
    textContent: "start",
  });
  allElements.buttons.repeat = createDOMElement({
    tagName: "button",
    classList: ["button"],
    textContent: "Repeat the sequence",
  });
  allElements.buttons.newGame = createDOMElement({
    tagName: "button",
    classList: ["button"],
    textContent: "new game",
  });
  allElements.buttons.next = createDOMElement({
    tagName: "button",
    classList: ["button"],
    textContent: "next",
  });

  allElements.container.append(
    allElements.headerPrimary,
    allElements.roundWrapper,
    allElements.inputField,
    allElements.levelList,
    allElements.keyboardWrapper,
    ...Object.values(allElements.buttons),
  );

  document.body.append(allElements.container);

  return {
    keyboardWrapper: allElements.keyboardWrapper,
    roundCounter: allElements.roundCounter,
  };
}
