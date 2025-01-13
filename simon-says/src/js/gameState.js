import { LEVELS } from "@/js/gameConstants.js";

export const gameState = {
  roundCounter: 0,
  level: LEVELS[0],
  isPlaying: false,
  isMistake: false,
  isPressed: false,
  sequenceArray: [],
  sequenceButtons: [],
  sequence: "",
};
