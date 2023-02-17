import {displayTodayStats,  displayTotalStats} from "./displayStats.js";

export function incrementSeconds(seconds, statsTextForSeconds, todayStatsTextContainer, totalStatsTextContainer) {
  seconds += 1;
  localStorage.todayTotalSeconds = parseInt(localStorage.todayTotalSeconds) + 1;
  localStorage.totalTotalSeconds = parseInt(localStorage.totalTotalSeconds) + 1;
  todayStatsTextContainer.innerHTML = displayTodayStats();
  totalStatsTextContainer.innerHTML = displayTotalStats();
  statsTextForSeconds.innerHTML = 'Seconds: ' + seconds + 's';
  resetAtMidnight();

  return seconds;
}

export function resetAtMidnight() {
  let currentDate = new Date();
  let currentSeconds = currentDate.getSeconds();
  let currentMinutes = currentDate.getMinutes();
  let currentHours = currentDate.getHours();
  
  if (currentHours == 0 && currentMinutes == 0 && currentSeconds == 0) {
    resetLocalStorageForTodayStats();
  }
}
