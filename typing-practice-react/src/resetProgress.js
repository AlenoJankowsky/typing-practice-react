import {markCurrentChar} from "./displayText.js";
import {displayStats, displayTodayStats} from "./displayStats.js";

export function resetProgress(state, text, lastSetStatsText, todayStatsText) {
  state.charIndex = 0;
  state.seconds = 0;
  state.userKeyTypeCount = 0;
  state.userMistakesCount = 0;
  text.innerHTML = markCurrentChar(text, state.charIndex);
  lastSetStatsText.innerHTML = displayStats(state.userMistakesCount, state.userKeyTypeCount, state.seconds);
  todayStatsText.innerHTML = displayTodayStats(state.userKeyTypeCount, state.amountOfSets);
}
