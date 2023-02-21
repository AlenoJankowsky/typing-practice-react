export function createStringForStats(userMistakesCount, userKeyTypeCount, seconds) {
  if (userMistakesCount == 0 && userKeyTypeCount == 0) {
    return 'CPM: 0 Wrong Chars: 0%';
  }

  let minutes = seconds / 60;
  const charactersPerMinute = userKeyTypeCount / minutes;
  
  return `CPM: ${Math.round(charactersPerMinute)} Wrong Chars: ${Math.round((userMistakesCount / userKeyTypeCount) * 100)}%`;
}

export function createStringForTodayStats() {
  return generateStats('todayTotalSeconds', 'todayCharsTyped', 'todayMistypes', 'todayAmountOfSets')
}

export function createStringForTotalStats() {
  return generateStats('totalTotalSeconds', 'totalCharsTyped', 'totalMistypes', 'totalAmountOfSets');
}

export function toggleExtendedStats(extendedStatsContainer) {
  if (extendedStatsContainer.style.display === 'none' || extendedStatsContainer.style.display === '') {
    extendedStatsContainer.style.display = 'block';
  }
  else {
    extendedStatsContainer.style.display = 'none';
  }
}

function generateStats(stringForSeconds, stringForCharsTyped, stringForMistypes, stringForAmountOfSets) {
  let minutes = parseInt(localStorage.getItem(stringForSeconds)) / 60;
  let cpmComputation = parseInt(localStorage.getItem(stringForCharsTyped)) / minutes;
  let mistakeRatio = parseFloat(localStorage.getItem(stringForMistypes)) / parseFloat(localStorage.getItem(stringForCharsTyped));
  let mistakeRatioWithThreeDecimalPlaces = mistakeRatio.toFixed(3);
  let charactersPerMinute = Math.round(cpmComputation);
  let charsTyped = parseInt(localStorage.getItem(stringForCharsTyped));
  const sets = 'Sets: ' + parseInt(localStorage.getItem(stringForAmountOfSets));
  const time = parseInt(localStorage.getItem(stringForSeconds));

  mistakeRatioWithThreeDecimalPlaces = preventNaNs(mistakeRatioWithThreeDecimalPlaces);
  charactersPerMinute = preventNaNs(charactersPerMinute);
  charsTyped = preventNaNs(charsTyped);

  return `${sets}, Chars typed:  ${charsTyped}, CPM: ${charactersPerMinute}, Time: ${time}s, Mistake Ratio: ${mistakeRatioWithThreeDecimalPlaces}%`;
}

function preventNaNs(valueOfVariable) {
  const valueOfVariableIsNaN = isNaN(valueOfVariable);
  if (valueOfVariableIsNaN) {
    return 0;
  }

  return valueOfVariable;
}
