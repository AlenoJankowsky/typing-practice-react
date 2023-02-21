import {createStringForStats, createStringForTotalStats} from "./createStringForStats.js";

function createResultParagraphText(text, charIndex, span) {
  const resultParagraphText = text.innerText.substring(0, charIndex) + span.outerHTML + text.innerText.substring(charIndex + 1);

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

export function markCurrentChar(text, charIndex) {
  const span = document.createElement('span');
  const textForSpan = document.createTextNode(text.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.backgroundColor = 'white';

  return createResultParagraphText(text, charIndex, span);
}

export function markIncorrectChar(text, charIndex) {
  const span = document.createElement('span');
  const textForSpan = document.createTextNode(text.innerText[charIndex]);
  span.appendChild(textForSpan);
  span.style.color = 'red';

  return createResultParagraphText(text, charIndex, span);
}

export function displayParagraphs(userInputIsCorrect, text, charIndex, lastSetStatsText, seconds, userMistakesCount, userKeyTypeCount, todayStatsTextContainer) {
  if (userInputIsCorrect) {
    text.innerHTML = markCurrentChar(text, charIndex + 1);
    lastSetStatsText.innerHTML = createStringForStats(userMistakesCount, userKeyTypeCount, seconds);
    todayStatsTextContainer.innerHTML = createStringForTotalStats(userKeyTypeCount);

    return charIndex += 1;
  }

  text.innerHTML = markIncorrectChar(text, charIndex);
  lastSetStatsText.innerHTML = createStringForStats(userMistakesCount, userKeyTypeCount, seconds);
  todayStatsTextContainer.innerHTML = createStringForTotalStats(userKeyTypeCount);
  
  return charIndex;
}
