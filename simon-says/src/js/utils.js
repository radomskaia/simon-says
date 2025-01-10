const DELAY_TIME = 300;
/**
 * Creates and returns a new DOM element with the specified properties.
 * @param {Object} options - The options for creating the DOM element.
 * @param {string} [options.tagName='div'] - The tag name of the element.
 * @param {string[]} [options.classList=[]] - A list of CSS classes to apply to the element.
 * @param {string} [options.textContent=''] - The text content of the element.
 * @param {Object} [options.attributes={}] - A map of attributes to set on the element.
 * @returns {HTMLElement} - The created DOM element.
 */
export function createDOMElement({
  tagName = "div",
  classList = [],
  textContent = "",
  attributes = {},
} = {}) {
  const element = document.createElement(tagName);
  if (Array.isArray(classList)) {
    element.classList.add(...classList);
  } else if (classList.trim()) {
    element.classList.add(...classList.split(" "));
  }
  if (textContent) {
    element.textContent = textContent;
  }
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value),
    );
  }

  return element;
}

export function debounce(callback, delay = DELAY_TIME) {
  let timeoutID;
  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback(...args), delay);
  };
}
