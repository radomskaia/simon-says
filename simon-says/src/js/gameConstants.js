export const LEVELS = ["easy", "medium", "hard"];

export const roundStatus = {
  mistake: "MISTAKE",
  win: "WIN_ROUND",
};

export const GAME_MESSAGES = {
  START: "Switch to English keyboard layout",
  [roundStatus.win]: "You passed the round! =)",
  [roundStatus.mistake]: "You are wrong! =(",
  WIN: "YOU WIN",
  LOSE: "GAME OVER",
  CHANGE_LAYOUT:
    "Change the keyboard layout, please. The layout is Russian now.",
  SIMON_SAYS: "Simon says: ",
};

export const NUMBER_OF_ROUND = 5;

export const CSS_CLASSES = {
  HIDDEN: "display-none",
  [roundStatus.win]: "outputFieldFinish",
  [roundStatus.mistake]: "outputFieldMistake",
  HIGHLIGHT_BUTTON: "actionButtonHighlight",
  BUTTON_ACTIVE: "buttonKeyboardActive",
  NON_INTERACTIVE: "no-pointer-events",
};
export const RUSSIAN_LAYOUT = { firstChar: "а", lastChar: "я" };
export const NUMBER_LAYOUT = {
  firstCharCode: "0".charCodeAt(0),
  lastCharCode: "9".charCodeAt(0),
};
export const ENGLISH_LAYOUT = {
  firstCharCode: "a".charCodeAt(0),
  lastCharCode: "z".charCodeAt(0),
};

export const ANIMATION = {
  duration: 700,
  easing: "ease-in-out",
  delay: 300,
  transform: { base: "scale(1)", active: "scale(1.2)" },
  background: { base: "var(--primary-alpha)", active: "var(--dark)" },
};
