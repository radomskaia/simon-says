import { CSS_CLASSES, GAME_MESSAGES } from "@/js/gameConstants.js";
import { gameState } from "@/js/gameState.js";

export function disabledKeyboard(isDisabled) {
  gameState.isPlaying = !isDisabled;
  gameState.elements.keyboardWrapper.classList.toggle(
    CSS_CLASSES.NON_INTERACTIVE,
    isDisabled,
  );
}

function disabledButtons(isDisabled) {
  gameState.elements.buttonWrapper.classList.toggle(
    CSS_CLASSES.NON_INTERACTIVE,
    isDisabled,
  );
}

function showSequence(buttons) {
  disabledKeyboard(true);
  disabledButtons(true);
  let index = 0;

  function showNextChar() {
    if (index >= buttons.length) {
      disabledKeyboard(false);
      disabledButtons(false);
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
  const keyboard = gameState.elements.keyboards[gameState.level];
  const repeatButton = gameState.elements.actionButtons.repeat;
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
    gameState.elements.actionButtons.repeat.classList.remove(
      CSS_CLASSES.HIGHLIGHT_BUTTON,
    );
    gameState.elements.outputField.classList.remove(CSS_CLASSES.MISTAKE);
    gameState.elements.outputField.classList.remove(CSS_CLASSES.WIN_ROUND);
    gameState.elements.outputField.textContent = GAME_MESSAGES.SIMON_SAYS;
    gameState.sequenceArray = gameState.sequence.split("");
    repeatButton.disabled = true;
  };
  showSequence(sequenceButtons);
}

export function startGame() {
  gameState.roundCounter++;
  gameState.elements.roundCounter.textContent = gameState.roundCounter;
  gameState.elements.outputField.classList.remove(CSS_CLASSES.MISTAKE);
  gameState.elements.outputField.classList.remove(CSS_CLASSES.WIN_ROUND);
  gameState.elements.actionButtons.repeat.disabled = false;
  gameState.isMistake = false;
  gameState.elements.levelList.classList.add(CSS_CLASSES.NON_INTERACTIVE);
  gameState.elements.actionButtons.repeat.classList.remove(
    CSS_CLASSES.HIGHLIGHT_BUTTON,
  );

  Object.entries(gameState.elements.actionButtons).forEach(([key, value]) => {
    if (key === "start" || key === "next") {
      value.classList.add(CSS_CLASSES.HIDDEN);
      return;
    }
    value.classList.remove(CSS_CLASSES.HIDDEN);
  });
  gameState.elements.outputField.textContent = GAME_MESSAGES.SIMON_SAYS;
  generateSequence();
}
