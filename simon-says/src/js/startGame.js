import { gameState } from "./newGame.js";

export function disabledKeyboard(isDisabled) {
  gameState.isPlaying = !isDisabled;
  gameState.elements.keyboardWrapper.classList.toggle(
    "no-pointer-events",
    isDisabled,
  );
}

function disabledButtons(isDisabled) {
  gameState.elements.buttonWrapper.classList.toggle(
    "no-pointer-events",
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
  console.log("Simon says:", gameState.sequenceArray);
  repeatButton.onclick = () => {
    showSequence(sequenceButtons);
    gameState.isMistake = true;
    gameState.elements.actionButtons.repeat.classList.remove(
      "actionButtonHighlight",
    );
    gameState.elements.outputField.classList.remove("outputFieldMistake");
    gameState.elements.outputField.classList.remove("outputFieldFinish");
    gameState.elements.outputField.textContent = "Your sequence: ";
    gameState.sequenceArray = gameState.sequence.split("");
    repeatButton.disabled = true;
  };
  showSequence(sequenceButtons);
}

export function startGame() {
  gameState.roundCounter++;
  gameState.elements.roundCounter.textContent = gameState.roundCounter;
  gameState.elements.outputField.classList.remove("outputFieldMistake");
  gameState.elements.outputField.classList.remove("outputFieldFinish");
  gameState.elements.actionButtons.repeat.disabled = false;
  gameState.isMistake = false;
  gameState.elements.levelList.classList.add("no-pointer-events");
  gameState.elements.actionButtons.repeat.classList.remove(
    "actionButtonHighlight",
  );

  Object.entries(gameState.elements.actionButtons).forEach(([key, value]) => {
    if (key === "start" || key === "next") {
      value.classList.add("display-none");
      return;
    }
    value.classList.remove("display-none");
  });
  gameState.elements.outputField.textContent = "Your sequence: ";
  generateSequence();
}
