/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {displayStats, displayTodayStats, displayTotalStats, toggleExtendedStats} from './displayStats.js';
import {parseLocalStorage, resetLocalStorageForTodayStats, resetLocalStorageForTotalStats} from './localStorageHandler.js';
import {incrementSeconds} from './timeHandler.js';
import {handleKeyDownEvent} from './handleKeyDownEvent.js';
import {generateFinalText} from './generateFinalText.js';
import {markCurrentChar} from './displayText.js'
import {resetProgress} from './resetProgress.js'

let localStorage = window.localStorage;
localStorage = parseLocalStorage(localStorage);
const keyboardKeysArray = [['A', 0, 0], ['B', 0, 0], ['C', 0, 0], ['D', 0, 0], ['E', 0, 0], ['F', 0, 0], ['G', 0, 0], ['H', 0, 0], ['I', 0, 0], ['J', 0, 0], ['K', 0, 0], ['L', 0, 0], ['M', 0, 0],
                           ['N', 0, 0], ['O', 0, 0], ['P', 0, 0], ['Q', 0, 0], ['R', 0, 0], ['S', 0, 0], ['T', 0, 0], ['U', 0, 0], ['V', 0, 0], ['W', 0, 0], ['X', 0, 0], ['Y', 0, 0], ['Z', 0, 0]];

class Game extends React.Component {
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
      amountOfSets: 0,
      incrementSecondsInterval: null,
      generateTextButtonIsClicked: false,
      extendedStatsString: "",
    };
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

  async fetchText(state) {
    const text = document.getElementById('text');
    state.charArray = await generateFinalText(text);

    if (state.generateTextButtonIsClicked) {
      document.removeEventListener('keydown', this.keyDownHandler);
      resetProgress(state, text, this.lastSetStatsText.current, this.todayStatsText.current);
      clearInterval(state.incrementSecondsInterval);
    }
  
    text.innerHTML = markCurrentChar(text, state.charIndex);
    document.addEventListener('keydown', (event) => this.keyDownHandler(event, this.state, this.statsTextForSeconds.current, this.todayStatsText.current, this.totalStatsText.current, this.lastSetStatsText.current));
  
    state.generateTextButtonIsClicked = true;
  }

  async keyDownHandler(event, state, statsTextForSeconds, todayStatsText, totalStatsText, lastSetStatsText) {
    const text = document.getElementById('text');
    const extendedStatsText = document.getElementById('extended-stats-text');
    let charArray = text.innerText;
    const userInput = event.key;
    const userInputIsCorrect = charArray[state.charIndex] === userInput;
    const isFirstTry = state.tryCounter == 0;
    const isBeginOfTyping = state.userKeyTypeCount == 0;
    
    if (isBeginOfTyping) {
      this.beginCounting(state, statsTextForSeconds, todayStatsText, totalStatsText, lastSetStatsText);
    }

    if (state.generateTextButtonIsClicked) {
      keyboardKeysArray.forEach(function(keyBoardKeyEntryInArray) {
        const isTheCorrectlyTypedKey = keyBoardKeyEntryInArray[0] == (event.key).toUpperCase();
        if (isFirstTry && userInputIsCorrect) {
          if (isTheCorrectlyTypedKey) {
            keyBoardKeyEntryInArray[1]++; 
          }
        }
  
        if (isTheCorrectlyTypedKey) {
          keyBoardKeyEntryInArray[2]++;
        }
      });
      
      state.extendedStatsString = "";
      keyboardKeysArray.forEach(function(keyBoardKeyEntryInArray) {
        let computedValue = Math.round(keyBoardKeyEntryInArray[1] / keyBoardKeyEntryInArray[2] * 100);
        if (keyBoardKeyEntryInArray[1] == 0) {
          computedValue = 0;
        }
        
        state.extendedStatsString += `${keyBoardKeyEntryInArray[0]} ${computedValue}%<br>`;
      });
      
      extendedStatsText.innerHTML = state.extendedStatsString;
  
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
      const endOfArrayIsReached = state.charIndex === charArray.length - 1;
      if (endOfArrayIsReached) {
        clearInterval(this.incrementSecondsInterval);
        charArray = await generateFinalText(text);
        resetProgress(state, text, this.lastSetStatsText.current, this.todayStatsText.current);
        localStorage.todayAmountOfSets = parseInt(localStorage.todayAmountOfSets) + 1;
        localStorage.totalAmountOfSets = parseInt(localStorage.totalAmountOfSets) + 1;
  
        return;
      }  
  
      state.charIndex = handleKeyDownEvent(event, text, lastSetStatsText, todayStatsText, charArray, state.charIndex, state.seconds, state.userKeyTypeCount, state.userMistakesCount, userInputIsCorrect);
    }
}
  render() {
    const statsText = displayStats(this.state.userMistakesCount, this.state.userKeyTypeCount, this.state.seconds);
    const todayStatsText = displayTodayStats();
    const totalStatsText = displayTotalStats();
    const secondsStatsText = `Seconds ${this.state.seconds}`;

    return (
      <>
        <div className="stats-container">
          <p className="stats-container__headline">Stats</p>
          <p className="stats-container__last-set-headline">Last Set</p>
          <p className="stats-container__time-text" id="last-set-stats-time-text" ref={this.statsTextForSeconds}>{secondsStatsText}</p>
          <p className="stats-container__text" id="last-set-stats-text" ref={this.lastSetStatsText}>{statsText}</p>
          <p className="stats-container__today-headline">Today</p>
          <p className="stats-container__today-text" id="today-stats-text"  ref={this.todayStatsText}>{todayStatsText}</p>
          <p className="stats-container__total-headline">Total</p>
          <p className="stats-container__total-text" id="total-stats-text" ref={this.totalStatsText}>{totalStatsText}</p>
          <button id="show-extended-stats" onClick={() => {toggleExtendedStats(document.getElementById('extended-stats-container'))}} className="stats-container__more-stats-button">More Stats</button>
          <button id="delete-today-stats" onClick={resetLocalStorageForTodayStats} className="stats-container__delete-today-stats">DELETE TODAY STATS</button>
          <button id="delete-total-stats" onClick={resetLocalStorageForTotalStats} className="stats-container__delete-total-stats">DELETE TOTAL STATS</button>
        </div>
        <div className="typing-container">
          <p className="typing-container__headline">Typing</p>
          <button className="typing-container__reset-button" id="reset-button">Reset</button>
          <div className="typing-container__typing-area">
            <form>
              <p className="typing-container__text-length">Text-length:</p>
              <input type="number" id="amount-of-words" className="typing-container__input-for-amount-of-words-in-text"></input>
              <input onClick={() => this.fetchText(this.state)} type="button" className="typing-area__generate-text-button" id="generate-text-button" value="Generate New Text"></input>
            </form>
            <p id="text" className="typing-area__text"></p>
          </div>
        </div>
        <div id="extended-stats-container" className="extended-stats-container">
          <p id="extended-stats-text" className="extended-stats-container__text"></p>
        </div>
      </>
    );
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game/>)
