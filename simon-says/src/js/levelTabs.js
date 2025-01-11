import { createDOMElement } from "./utils.js";
import { gameState } from "@/js/newGame.js";

function createRadioButton(id, levelInputs) {
  const liElement = createDOMElement({
    tagName: "li",
  });
  const inputElement = createDOMElement({
    tagName: "input",
    classList: ["display-none"],
    attributes: {
      type: "radio",
      name: "level",
      id: id,
    },
  });
  levelInputs[id] = inputElement;
  const labelElement = createDOMElement({
    tagName: "label",
    classList: ["button", "tabButton"],
    textContent: id,
    attributes: {
      for: id,
    },
  });
  liElement.append(inputElement, labelElement);
  liElement.addEventListener("click", (e) => {
    gameState.level = id;
  });
  return liElement;
}

export function createLevelList(levels, elements) {
  const levelList = createDOMElement({
    tagName: "ul",
    classList: ["flex", "flex--justify-center", "flex_gap-20", "levelList"],
  });
  const levelsButton = {};
  elements.levelInputs = {};
  levels.forEach((level) => {
    levelsButton[level] = createRadioButton(level, elements.levelInputs);
  });
  levelList.append(...Object.values(levelsButton));
  return levelList;
}
