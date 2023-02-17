import {displayParagraphs} from "./displayText.js";
import {preventSpaceBar} from "./preventDefault.js";

export function handleKeyDownEvent(event, paragraphWithText, statsTextContainer, todayStatsTextContainer, charArray, charIndex, seconds, userKeyTypeCount, userMistakesCount, userInputIsCorrect) {
  preventSpaceBar(event, text, charIndex);
  
  charIndex = displayParagraphs(userInputIsCorrect, paragraphWithText, charIndex, statsTextContainer, seconds, userMistakesCount, userKeyTypeCount, todayStatsTextContainer);

  return charIndex;
}
