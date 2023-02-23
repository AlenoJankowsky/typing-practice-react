export function parseLocalStorage(localStorage) {
  if (localStorage.todayAmountOfSets) {
    localStorage.todayAmountOfSets = parseInt(localStorage.getItem('todayAmountOfSets'));
  }
  else {
    localStorage.setItem('todayAmountOfSets', '0');
    localStorage.todayAmountOfSets = 0;
  }
  
  if (localStorage.todayCharsTyped) {
    localStorage.todayCharsTyped = parseFloat(localStorage.getItem('todayCharsTyped'));
  }
  else {
    localStorage.setItem('todayCharsTyped', '0');
    localStorage.todayCharsTyped = 0.0;
  }
  
  if (localStorage.todayCPM) {
    localStorage.todayCPM = parseInt(localStorage.getItem('todayCPM'));
  }
  else {
    localStorage.setItem('todayCPM', '0');
    localStorage.todayCPM = 0;
  }
  
  if (localStorage.todayTotalSeconds) {
    localStorage.todayTotalSeconds = parseInt(localStorage.getItem('todayTotalSeconds'));
  }
  else {
    localStorage.setItem('todayTotalSeconds', '0');
    localStorage.todayTotalSeconds = 0;
  }

  if (localStorage.todayMistypes) {
    localStorage.todayMistypes = parseFloat(localStorage.getItem('todayMistypes'));
  }
  else {
    localStorage.setItem('todayMistypes', '0');
    localStorage.todayMistypes = 0;
  }


  if (localStorage.totalAmountOfSets) {
    localStorage.totalAmountOfSets = parseInt(localStorage.getItem('totalAmountOfSets'));
  }
  else {
    localStorage.setItem('totalAmountOfSets', '0');
    localStorage.totalAmountOfSets = 0;
  }
  
  if (localStorage.totalCharsTyped) {
    localStorage.totalCharsTyped = parseFloat(localStorage.getItem('totalCharsTyped'));
  }
  else {
    localStorage.setItem('totalCharsTyped', '0');
    localStorage.totalCharsTyped = 0;
  }
  
  if (localStorage.totalCPM) {
    localStorage.totalCPM = parseInt(localStorage.getItem('totalCPM'));
  }
  else {
    localStorage.setItem('totalCPM', '0');
    localStorage.totalCPM = 0;
  }
  
  if (localStorage.totalTotalSeconds) {
    localStorage.totalTotalSeconds = parseInt(localStorage.getItem('totalTotalSeconds'));
  }
  else {
    localStorage.setItem('totalTotalSeconds', '0');
    localStorage.totalTotalSeconds = 0;
  }

  if (localStorage.totalMistypes) {
    localStorage.totalMistypes = parseFloat(localStorage.getItem('totalMistypes'));
  }
  else {
    localStorage.setItem('totalMistypes', '0');
    localStorage.totalMistypes = 0;
  }

  return localStorage;
}

export function resetLocalStorageForTodayStats(localStorage) {
  localStorage.todayAmountOfSets = 0;
  localStorage.todayCharsTyped = 0;
  localStorage.todayCPM = 0;
  localStorage.todayTotalSeconds = 0;
  localStorage.todayMistypes = 0;

  location.reload();

  return;
}

export function resetLocalStorageForTotalStats(localStorage) {
  localStorage.totalAmountOfSets = 0;
  localStorage.totalCharsTyped = 0;
  localStorage.totalCPM = 0;
  localStorage.totalTotalSeconds = 0;
  localStorage.totalMistypes = 0;

  location.reload();

  return;
}
