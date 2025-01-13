import { disabledButtons } from "@/js/utils.js";
import { elementsDOM } from "@/js/elementsDOM.js";
import { gameState } from "@/js/gameState.js";
import { ANIMATION, GAME_MESSAGES } from "@/js/gameConstants.js";

export function showSequence(buttons) {
  gameState.isPlaying = false;
  let index = 0;

  function showNextChar() {
    if (index >= buttons.length) {
      disabledButtons(false, [
        elementsDOM.keyboards[gameState.level],
        elementsDOM.actionButtons,
      ]);
      gameState.isPlaying = true;
      return;
    }
    const button = buttons[index];

    const animation = button.animate(
      [
        {
          backgroundColor: ANIMATION.background.base,
          transform: ANIMATION.transform.base,
        },
        {
          backgroundColor: ANIMATION.background.active,
          transform: ANIMATION.transform.active,
        },
        {
          backgroundColor: ANIMATION.background.base,
          transform: ANIMATION.transform.base,
        },
      ],
      {
        duration: ANIMATION.duration,
        easing: ANIMATION.easing,
        delay: ANIMATION.delay,
      },
    );

    animation.onfinish = () => {
      index++;
      showNextChar();
    };
  }

  showNextChar();
}

export function generateSequence() {
  const sequenceLength = gameState.roundCounter * 2;
  const keyboard = elementsDOM.keyboards[gameState.level];
  const maxIndex = Object.values(keyboard).length;
  gameState.sequenceButtons = [];
  for (let i = 0; i < sequenceLength; i++) {
    const index = Math.floor(Math.random() * maxIndex);
    const char = Object.keys(keyboard)[index];
    gameState.sequenceArray.push(char);
    gameState.sequenceButtons.push(keyboard[char]);
  }
  gameState.sequence = gameState.sequenceArray.join("");
  console.log(GAME_MESSAGES.SIMON_SAYS, gameState.sequenceArray);
  showSequence(gameState.sequenceButtons);
}
