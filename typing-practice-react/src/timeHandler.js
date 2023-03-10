import {createStringForTodayStats,  createStringForTotalStats} from "./createStringForStats.js";

export function incrementSeconds(seconds, statsTextForSeconds, todayStatsTextContainer, totalStatsTextContainer) {
  seconds += 1;
  localStorage.todayTotalSeconds = parseInt(localStorage.todayTotalSeconds) + 1;
  localStorage.totalTotalSeconds = parseInt(localStorage.totalTotalSeconds) + 1;
  todayStatsTextContainer.innerHTML = createStringForTodayStats();
  totalStatsTextContainer.innerHTML = createStringForTotalStats();
  statsTextForSeconds.innerHTML = 'Seconds: ' + seconds + 's';
  resetAtMidnight();

  return seconds;
}

export function resetAtMidnight() {
  const currentDate = new Date();
  const currentSeconds = currentDate.getSeconds();
  const currentMinutes = currentDate.getMinutes();
  const currentHours = currentDate.getHours();
  
  if (currentHours == 0 && currentMinutes == 0 && currentSeconds == 0) {
    resetLocalStorageForTodayStats();
  }
}
