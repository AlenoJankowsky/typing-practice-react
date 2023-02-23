import {displayParagraphs} from "./createText.js";
import {preventSpaceBar} from "./preventDefault.js";

export function handleKeyDownEvent(
  event, 
  text, 
  lastSetStatsText, 
  todayStatsTextContainer, 
  charArray, 
  charIndex, 
  seconds, 
  userKeyTypeCount, 
  userMistakesCount, 
  userInputIsCorrect
)
  {
    preventSpaceBar(event, charArray, charIndex);
    
    charIndex = displayParagraphs(
      userInputIsCorrect,
      text,
      charIndex,
      lastSetStatsText, 
      seconds,
      userMistakesCount,
      userKeyTypeCount,
      todayStatsTextContainer
    );

    return charIndex;
}
