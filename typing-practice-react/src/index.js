import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {displayStats, displayTodayStats, displayTotalStats} from './displayStats.js';
import {parseLocalStorage} from './localStorageHandler.js';
import {incrementSeconds} from './timeHandler.js';
import {handleKeyDownEvent} from './handleKeyDownEvent.js';
import {generateFinalText} from './generateFinalText';

let localStorage = window.localStorage;
localStorage = parseLocalStorage(localStorage);

class StatsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.statsTextForSeconds = React.createRef();
    this.todayStatsText = React.createRef();
    this.totalStatsText = React.createRef();
    this.lastSetStatsText = React.createRef();
    this.state = {
      userMistakesCount: 0,
      userKeyTypeCount: 0,
      seconds: 0,
      charIndex: 0,
      tryCounter: 0,
      incrementSecondsInterval: null,
    };

    document.addEventListener('keydown', (event) => this.keyDownHandler(event, this.state, this.statsTextForSeconds.current, this.todayStatsText.current, this.totalStatsText.current, this.lastSetStatsText.current));
  }

  beginCounting(state, statsTextForSeconds, todayStatsText, totalStatsText, lastSetStatsText) {
    this.incrementSecondsInterval = setInterval(function() {
      state.seconds = incrementSeconds(state.seconds, statsTextForSeconds, todayStatsText, totalStatsText);
      let minutes = state.seconds / 60;
      const charactersPerMinute = state.userKeyTypeCount / minutes;
  
      if (state.userKeyTypeCount == 0) {
        lastSetStatsText.innerHTML = 'CPM: 0, Wrong Chars: 0%';
      }
      else {
        lastSetStatsText.innerHTML = `CPM: ${Math.round(charactersPerMinute)} Wrong Chars: ${Math.round((state.userMistakesCount * 100 / state.userKeyTypeCount * 100) / 100)}%`;
      }
    }, 1000);
  };

  async keyDownHandler(event, state, statsTextForSeconds, todayStatsText, totalStatsText, lastSetStatsText) {
    const text = document.getElementById('text');
    const charArray = document.getElementById('text').innerHTML;
    const userInput = event.code;
    const userInputIsCorrect = charArray[state.charIndex] == event.code;
    const isFirstTry = state.tryCounter == 0;
    const isBeginOfTyping = state.userKeyTypeCount == 0;

    if (isBeginOfTyping) {
      this.beginCounting(state, statsTextForSeconds, todayStatsText, totalStatsText, lastSetStatsText);
    }

    // keyboardKeysArray.forEach(function(keyBoardKeyEntryInArray) {
    //   const isTheCorrectlyTypedKey = keyBoardKeyEntryInArray[0] == (event.key).toUpperCase();
    //   if (isFirstTry && userInputIsCorrect) {
    //     if (isTheCorrectlyTypedKey) {
    //       keyBoardKeyEntryInArray[1]++; 
    //     }
    //   }

    //   if (isTheCorrectlyTypedKey) {
    //     keyBoardKeyEntryInArray[2]++;
    //   }
    // });

    // extendedStatsString = "";
    // keyboardKeysArray.forEach(function(keyBoardKeyEntryInArray) {
    //   let computedValue = Math.round(keyBoardKeyEntryInArray[1] / keyBoardKeyEntryInArray[2] * 100);
    //   if (keyBoardKeyEntryInArray[1] == 0) {
    //     computedValue = 0;
    //   }
      
    //   extendedStatsString += `${keyBoardKeyEntryInArray[0]} ${computedValue}%<br>`;
    // });
    
    // extendedStatsText.innerHTML = extendedStatsString;

    if (!userInputIsCorrect) {
      state.tryCounter ++;
      state.userMistakesCount ++;
      localStorage.todayMistypes = parseInt(localStorage.todayMistypes) + 1;
      localStorage.totalMistypes = parseInt(localStorage.totalMistypes) + 1;
    }
    else {
      state.tryCounter = 0;
    }

    if (userInput != 'Space') {
      state.userKeyTypeCount ++;
      localStorage.todayCharsTyped = parseInt(localStorage.todayCharsTyped) + 1;
      localStorage.totalCharsTyped = parseInt(localStorage.totalCharsTyped) + 1;
    }

    const endOfArrayIsReached = state.charIndex === text.length - 1;
    if (endOfArrayIsReached) {
      clearInterval(this.incrementSecondsInterval);
      charArray = await generateText(paragraphWithText);
      resetProgress();
      localStorage.todayAmountOfSets = parseInt(localStorage.todayAmountOfSets) + 1;
      localStorage.totalAmountOfSets = parseInt(localStorage.totalAmountOfSets) + 1;

      return;
    }  

    state.charIndex = handleKeyDownEvent(event, text, statsTextForSeconds, todayStatsText, charArray, state.charIndex, state.seconds, state.userKeyTypeCount, state.userMistakesCount, userInputIsCorrect);
}

  render() {
    const statsText = displayStats(this.state.userMistakesCount, this.state.userKeyTypeCount, this.state.seconds);
    const todayStatsText = displayTodayStats();
    const totalStatsText = displayTotalStats();
    const secondsStatsText = `Seconds ${this.state.seconds}`;
    return (
      <div className="stats-container">
        <p className="stats-container__headline">Stats</p>
        <p className="stats-container__last-set-headline">Last Set</p>
        <p className="stats-container__time-text" id="last-set-stats-time-text" ref={this.statsTextForSeconds}>{secondsStatsText}</p>
        <p className="stats-container__text" id="last-set-stats-text" ref={this.lastSetStatsText}>{statsText}</p>
        <p className="stats-container__today-headline">Today</p>
        <p className="stats-container__today-text" id="today-stats-text"  ref={this.todayStatsText}>{todayStatsText}</p>
        <p className="stats-container__total-headline">Total</p>
        <p className="stats-container__total-text" id="total-stats-text" ref={this.totalStatsText}>{totalStatsText}</p>
        <button id="show-extended-stats" className="stats-container__more-stats-button">More Stats</button>
        <button id="delete-today-stats" className="stats-container__delete-today-stats">DELETE TODAY STATS</button>
        <button id="delete-total-stats" className="stats-container__delete-total-stats">DELETE TOTAL STATS</button>
      </div>
    );
  };

}

class ExtendesStatsContainer extends React.Component {
  render () {
    return (
      <div id="extended-stats-canvas" className="extended-stats-container">
        <p id="extended-stats-text" className="extended-stats-container__text"></p>
      </div>
    );
  };
}

class TypingContainer extends React.Component {
  async fetchText() {
    const charArray = await generateFinalText(document.getElementById('text'))
  }

  render() {
    return (
      <div className="typing-container">
        <p className="typing-container__headline">Typing</p>
        <button className="typing-container__reset-button" id="reset-button">Reset</button>
        <div className="typing-container__typing-area">
          <form>
            <p className="typing-container__text-length">Text-length:</p>
            <input type="number" id="amount-of-words" className="typing-container__input-for-amount-of-words-in-text"></input>
            <input onClick={this.fetchText} type="button" className="typing-area__generate-text-button" id="generate-text-button" value="Generate New Text"></input>
          </form>
          <p id="text" className="typing-area__text"></p>
        </div>
      </div>
    );
  };
};

class Game extends React.Component {
  render() {
    return (
      <>
        <StatsContainer/>
        <TypingContainer/>
        <ExtendesStatsContainer/>
      </>
    );
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game/>)
