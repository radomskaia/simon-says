import { createDOMElement } from "./utils.js";

function createRadioButton(id) {
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
  const labelElement = createDOMElement({
    tagName: "label",
    classList: ["button"],
    textContent: id,
    attributes: {
      for: id,
    },
  });
  liElement.append(inputElement, labelElement);
  return liElement;
}

export function createLevelList(levels) {
  const levelList = createDOMElement({
    tagName: "ul",
    classList: ["flex", "flex--justify-center", "flex_gap-20"],
  });
  const levelsElement = {};
  levels.forEach((level) => {
    levelsElement[level] = createRadioButton(level);
  });
  levelList.append(...Object.values(levelsElement));
  return levelList;
}
