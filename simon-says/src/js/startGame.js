import { CSS_CLASSES, GAME_MESSAGES } from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";
import { elementsDOM } from "@/js/elementsDOM.js";

export function disabledKeyboard(isDisabled) {
  gameState.isPlaying = !isDisabled;
  toggleElementInteractivity(!isDisabled, elementsDOM.keyboardWrapper);
}

function toggleElementInteractivity(isInteractivity, element) {
  element.classList.toggle(CSS_CLASSES.NON_INTERACTIVE, !isInteractivity);
}

function showSequence(buttons) {
  disabledKeyboard(true);
  toggleElementInteractivity(false, elementsDOM.buttonWrapper);
  let index = 0;

  function showNextChar() {
    if (index >= buttons.length) {
      disabledKeyboard(false);
      toggleElementInteractivity(true, elementsDOM.buttonWrapper);
      return;
    }
    const button = buttons[index];

    const animation = button.animate(
      [
        { backgroundColor: "var(--primary)", transform: "scale(1)" },
        { backgroundColor: "var(--dark)", transform: "scale(1.2)" },
        { backgroundColor: "var(--primary)", transform: "scale(1)" },
      ],
      {
        duration: 700,
        easing: "ease-in-out",
        delay: 300,
      },
    );

    animation.onfinish = () => {
      index++;
      showNextChar();
    };
  }

  showNextChar();
}

function generateSequence() {
  const sequenceLength = gameState.roundCounter * 2;
  const keyboard = elementsDOM.keyboards[gameState.level];
  const repeatButton = elementsDOM.actionButtons.repeat;
  const maxIndex = Object.values(keyboard).length;
  const sequenceButtons = [];
  for (let i = 0; i < sequenceLength; i++) {
    const index = Math.floor(Math.random() * maxIndex);
    const char = Object.keys(keyboard)[index];
    gameState.sequenceArray.push(char);
    sequenceButtons.push(keyboard[char]);
  }
  gameState.sequence = gameState.sequenceArray.join("");
  console.log(GAME_MESSAGES.SIMON_SAYS, gameState.sequenceArray);
  repeatButton.onclick = () => {
    showSequence(sequenceButtons);
    gameState.isMistake = true;
    elementsDOM.actionButtons.repeat.classList.remove(
      CSS_CLASSES.HIGHLIGHT_BUTTON,
    );
    elementsDOM.outputField.classList.remove(CSS_CLASSES.MISTAKE);
    elementsDOM.outputField.classList.remove(CSS_CLASSES.WIN_ROUND);
    elementsDOM.outputField.textContent = GAME_MESSAGES.SIMON_SAYS;
    gameState.sequenceArray = gameState.sequence.split("");
    repeatButton.disabled = true;
  };
  showSequence(sequenceButtons);
}

export function startGame() {
  gameState.roundCounter++;
  elementsDOM.roundCounter.textContent = gameState.roundCounter;
  elementsDOM.outputField.classList.remove(CSS_CLASSES.MISTAKE);
  elementsDOM.outputField.classList.remove(CSS_CLASSES.WIN_ROUND);
  elementsDOM.actionButtons.repeat.disabled = false;
  gameState.isMistake = false;
  elementsDOM.levelList.classList.add(CSS_CLASSES.NON_INTERACTIVE);
  elementsDOM.actionButtons.repeat.classList.remove(
    CSS_CLASSES.HIGHLIGHT_BUTTON,
  );

  Object.entries(elementsDOM.actionButtons).forEach(([key, value]) => {
    if (key === "start" || key === "next") {
      value.classList.add(CSS_CLASSES.HIDDEN);
      return;
    }
    value.classList.remove(CSS_CLASSES.HIDDEN);
  });
  elementsDOM.outputField.textContent = GAME_MESSAGES.SIMON_SAYS;
  generateSequence();
}
