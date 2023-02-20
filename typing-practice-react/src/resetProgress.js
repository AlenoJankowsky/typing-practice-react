import {markCurrentChar} from "./displayText.js";
import {displayStats, displayTodayStats} from "./displayStats.js";

export function resetProgress(text, lastSetStatsText, todayStatsText, charIndex, seconds, userKeyTypeCount, userMistakesCount, amountOfSets) {
  charIndex = 0;
  seconds = 0;
  userKeyTypeCount = 0;
  userMistakesCount = 0;
  text.innerHTML = markCurrentChar(text, charIndex);
  lastSetStatsText.innerHTML = displayStats(userMistakesCount, userKeyTypeCount, seconds);
  todayStatsText.innerHTML = displayTodayStats(userKeyTypeCount, amountOfSets);
}
