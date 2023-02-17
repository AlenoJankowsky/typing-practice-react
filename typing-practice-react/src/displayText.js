import {displayStats, displayTodayStats} from "./displayStats.js";

function createResultParagraphText(paragraphWithText, charIndex, span) {
  const resultParagraphText = paragraphWithText.innerText.substring(0, charIndex) + span.outerHTML + paragraphWithText.innerText.substring(charIndex + 1);

  return resultParagraphText;
}

function removeWhitespaces(text) {
  const resultText = text.replaceAll(',', "");

  return resultText
}

export function charArrayIntoString(textArray) {
  const resultString = textArray.join();


  return removeWhitespaces(resultString);
}

export function markCurrentChar(paragraphWithText, charIndex) {
  let span = document.createElement('span');
  let textForSpan = document.createTextNode(paragraphWithText.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.backgroundColor = 'white';

  return createResultParagraphText(paragraphWithText, charIndex, span);
}

export function markIncorrectChar(paragraphWithText, charIndex) {
  let span = document.createElement('span');
  let textForSpan = document.createTextNode(paragraphWithText.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.color = 'red';

  return createResultParagraphText(paragraphWithText, charIndex, span);
}

export function displayParagraphs(userInputIsCorrect, paragraphWithText, charIndex, statsTextContainer, seconds, userMistakesCount, userKeyTypeCount, todayStatsTextContainer) {
  if (userInputIsCorrect) {
    paragraphWithText.innerHTML = markCurrentChar(paragraphWithText, charIndex + 1);
    statsTextContainer.innerHTML = displayStats(userMistakesCount, userKeyTypeCount, seconds);
    todayStatsTextContainer.innerHTML = displayTodayStats(userKeyTypeCount);

    return charIndex += 1;
  }

  paragraphWithText.innerHTML = markIncorrectChar(paragraphWithText, charIndex);
  statsTextContainer.innerHTML = displayStats(userMistakesCount, userKeyTypeCount, seconds);
  todayStatsTextContainer.innerHTML = displayTodayStats(userKeyTypeCount);
  
  return charIndex;
}
