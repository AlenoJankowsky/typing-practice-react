import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class StatsContainer extends React.Component {
  render() {
    return (
      <div className="stats-container">
        <p className="stats-container__headline">Stats</p>
        <p className="stats-container__last-set-headline">Last Set</p>
        <p className="stats-container__time-text" id="last-set-stats-time-text"></p><p className="stats-container__text" id="last-set-stats-text"></p>
        <p className="stats-container__today-headline">Today</p>
        <p className="stats-container__today-text" id="today-stats-text"></p>
        <p className="stats-container__total-headline">Total</p>
        <p className="stats-container__total-text" id="total-stats-text"></p>
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
//   const [text, setText] = React.useState("");
//   const fetchText = async () => {
//     const fetchUrl = 'https://random-word-api.herokuapp.com/word?number=100'
//   //let amountOfWordsWanted = document.getElementById('amount-of-words').value;pp.com/word?number=' + 8;
//     const response = await fetch(fetchUrl);
//     const { text } = await response.text();
//     setText(text);
//   };
constructor(props) {
  super(props);
}

async fetchText() {
  const fetchUrl = 'https://random-word-api.herokuapp.com/word?number=100'
  const response = await fetch(fetchUrl);
  const text = await response.text();
  const textParagraph = document.getElementById('text');
  textParagraph.innerHTML = text.replaceAll(",", " ")
                                .replaceAll("[", "")
                                .replaceAll("]", "")
                                .replaceAll('"', "");
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
