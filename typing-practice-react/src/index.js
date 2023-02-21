import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createStringForStats, displayTodayStats, displayTotalStats, toggleExtendedStats} from './displayStats.js';
import {parseLocalStorage, resetLocalStorageForTodayStats, resetLocalStorageForTotalStats} from './localStorageHandler.js';
import {incrementSeconds} from './timeHandler.js';
import {handleKeyDownEvent} from './handleKeyDownEvent.js';
import {generateFinalText} from './generateFinalText.js';
import {markCurrentChar} from './displayText.js'

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
    this.extendedStatsText = React.createRef();
    this.resetButton = React.createRef();
    this.state = {
      userMistakesCount: 0,
      userKeyTypeCount: 0,
      seconds: 0,
      charIndex: 0,
      tryCounter: 0,
      amountOfSets: 0,
      incrementSecondsInterval: null,
      generateTextButtonIsClicked: false,
    };
  }

  resetProgress = () =>{
    if (this.state.generateTextButtonIsClicked) {
      this.setState({
        charIndex: 0,
        seconds: 0,
        userKeyTypeCount: 0,
        userMistakesCount: 0,
      },() => {
        text.innerHTML = markCurrentChar(text, this.state.charIndex);
        this.lastSetStatsText.current.innerHTML = displayStats(this.state.userMistakesCount, this.state.userKeyTypeCount, this.state.seconds);
        this.todayStatsText.current.innerHTML = displayTodayStats(this.state.userKeyTypeCount, this.state.amountOfSets);
      }
    )}
  }
    
  beginCounting(statsTextForSeconds, todayStatsText, totalStatsText, lastSetStatsText) {
    this.setState({incrementSecondsInterval: setInterval(() => {
      this.setState({seconds: incrementSeconds(this.state.seconds, statsTextForSeconds, todayStatsText, totalStatsText)})

      const minutes = this.state.seconds / 60;
      const charactersPerMinute = this.state.userKeyTypeCount / minutes;
  
      if (this.state.userKeyTypeCount == 0) {
        lastSetStatsText.innerHTML = 'CPM: 0, Wrong Chars: 0%';
      }
      else {
        lastSetStatsText.innerHTML = `CPM: ${Math.round(charactersPerMinute)} Wrong Chars: ${Math.round((this.state.userMistakesCount * 100 / this.state.userKeyTypeCount * 100) / 100)}%`;
      }
    }, 1000)});
  };

  async fetchText() {
    const text = document.getElementById('text');
    this.setState({charArray: await generateFinalText(text)});

    if (this.state.generateTextButtonIsClicked) {
      document.removeEventListener('keydown', this.keyDownHandler);
      this.setState({
        charIndex: 0,
        seconds: 0,
        userKeyTypeCount: 0,
        userMistakesCount: 0,
      },() => {
        text.innerHTML = markCurrentChar(text, this.state.charIndex);
        this.lastSetStatsText.current.innerHTML = displayStats(this.state.userMistakesCount, this.state.userKeyTypeCount, this.state.seconds);
        this.todayStatsText.current.innerHTML = displayTodayStats(this.state.userKeyTypeCount, this.state.amountOfSets);

        clearInterval(this.state.incrementSecondsInterval);
      });
    }
    else {
      text.innerHTML = markCurrentChar(text, this.state.charIndex);
      document.addEventListener('keydown', (event) => this.keyDownHandler(event, this.statsTextForSeconds.current, this.todayStatsText.current, this.totalStatsText.current, this.lastSetStatsText.current));
    }

    this.setState({generateTextButtonIsClicked: true});
  }

  async keyDownHandler(event, statsTextForSeconds, todayStatsText, totalStatsText, lastSetStatsText) {
    const text = document.getElementById('text');
    const charArray = text.innerText;
    const userInput = event.key;
    const userInputIsCorrect = charArray[this.state.charIndex] === userInput;
    const isFirstTry = this.state.tryCounter == 0;
    const isBeginOfTyping = this.state.userKeyTypeCount == 0;
    
    if (isBeginOfTyping) {
      this.beginCounting(statsTextForSeconds, todayStatsText, totalStatsText, lastSetStatsText);
    }

    if (this.state.generateTextButtonIsClicked) {
      keyboardKeysArray.forEach((keyBoardKeyEntryInArray) => {
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

      let extendedStatsString = "";
      keyboardKeysArray.forEach((keyBoardKeyEntryInArray) => {
        extendedStatsString += `${keyBoardKeyEntryInArray[0]} ${keyBoardKeyEntryInArray[1]}%`;
      });
      
      if (!userInputIsCorrect) {
        this.setState({
          tryCounter: this.state.tryCounter + 1,
          userMistakesCount: this.state.userMistakesCount + 1
        }, () => {
          localStorage.todayMistypes = parseInt(localStorage.todayMistypes) + 1;
          localStorage.totalMistypes = parseInt(localStorage.totalMistypes) + 1;
        });
      }
        
      else {
        this.setState({tryCounter: 0});
      }
  
      if (userInput != 'Space') {
        this.setState({userKeyTypeCount: this.state.userKeyTypeCount + 1});
        localStorage.todayCharsTyped = parseInt(localStorage.todayCharsTyped) + 1;
        localStorage.totalCharsTyped = parseInt(localStorage.totalCharsTyped) + 1;
      }
      const endOfArrayIsReached = this.state.charIndex === charArray.length - 1;
      if (endOfArrayIsReached) {
        clearInterval(this.state.incrementSecondsInterval);
        charArray = await generateFinalText(text);
        this.setState({
          charIndex: 0,
          secsonds: 0,
          userKeyTypeCount: 0,
          userMistakesCount: 0,
        }, () => {
          text.innerHTML = markCurrentChar(text, this.state.charIndex);
          this.lastSetStatsText.current.innerHTML = displayStats(this.state.userMistakesCount, this.state.userKeyTypeCount, this.state.seconds);
          this.todayStatsText.current.innerHTML = displayTodayStats(this.state.userKeyTypeCount, this.state.amountOfSets);

          localStorage.todayAmountOfSets = parseInt(localStorage.todayAmountOfSets) + 1;
          localStorage.totalAmountOfSets = parseInt(localStorage.totalAmountOfSets) + 1;
        });

        return;
      }  

      this.setState({charIndex: handleKeyDownEvent(event, text, lastSetStatsText, todayStatsText, charArray, this.state.charIndex, this.state.seconds, this.state.userKeyTypeCount, this.state.userMistakesCount, userInputIsCorrect)});
    }
}
  render() {
    let extendedStatsString = "";
    keyboardKeysArray.forEach((keyBoardKeyEntryInArray) => {
      let computedValue = Math.round(keyBoardKeyEntryInArray[1] / keyBoardKeyEntryInArray[2] * 100);
      if (keyBoardKeyEntryInArray[1] == 0) {
        computedValue = 0;
      }
      
      extendedStatsString += `(${keyBoardKeyEntryInArray[0]} ${computedValue}% ) `;
    });

    localStorage = parseLocalStorage(localStorage);
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
          <button id="delete-today-stats" onClick={() => {resetLocalStorageForTodayStats(localStorage)}} className="stats-container__delete-today-stats">DELETE TODAY STATS</button>
          <button id="delete-total-stats" onClick={() => {resetLocalStorageForTotalStats(localStorage)}} className="stats-container__delete-total-stats">DELETE TOTAL STATS</button>
        </div>
        <div className="typing-container">
          <p className="typing-container__headline">Typing</p>
          <button className="typing-container__reset-button" id="reset-button" onClick={this.resetProgress}>Reset</button>
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
          <p id="extended-stats-text" className="extended-stats-container__text" ref={this.extendedStatsText}>{extendedStatsString}</p>
        </div>
      </>
    );
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game/>)
