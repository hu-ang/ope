import { useState } from 'react';
import { uniq, bad_guesses, lives_left } from './game';
import './App.css';

function App() {
  //secret state should be a randomly generated number (4 digits, unique digits)
  const [secret, _setSecret] = useState("elephant");
  const [guesses, setGuesses] = useState([]);
  const [guessResults, setGuessResults] = useState([]);
  const [guess, setGuess] = useState("");

  //let view = word_view(secret, guesses);
  let bads = bad_guesses(secret, guesses);
  let lives = lives_left(secret, guesses);
  let results = guess_results(secret, guessResults, guess);

  function updateGuess(ev) {
    let text = ev.target.value;
    if (text.length > 4) {
      text = text[0];
    }
    setGuess(text);
  }

  function makeGuess() {
    setGuesses(uniq(guesses.concat(guess)));
    setGuess("");
  }

  function keypress(ev) {
    if (ev.key == "Enter") {
      makeGuess();
    }
  }

  if (lives <= 0) {
    return (
      <div className="App">
        <h1>Game Over</h1>
        <p>
          <button onClick={() => setGuesses([])}>
            Reset
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Guesses: {guesses.join(' ')}</h1>
      <h1>Results: {results.join(' ')}</h1>
      <h1>Bads: {bads.join(' ')}</h1>
      <h1>Lives: {lives}</h1>
      <p>
        <input type="text"
               value={guess}
               onChange={updateGuess}
               onKeyPress={keypress} />
        <button onClick={makeGuess}>
          Guess
        </button>
      </p>
      <p>
        <button onClick={() => setGuesses([])}>
          Reset
        </button>
      </p>
    </div>
  );

  function guess_results(secret, guessResults, guess) {
    //A -> right number right place
    //B -> right number wrong place
    let targetDigits = secret.split('');
    let guessDigits = guess.split('');
    let result = "";
    for (let i = 0; i < guess.length; i++) {
        if (targetDigits[i] == guessDigits[i]) {
            result.concat("A");
        }
        else if (targetDigits.includes(guessDigits[i])) {
            result.concat("B");
        }
        else {}
    }
    setGuessResults(uniq(guessResults.concat(result)));
    return uniq(guessResults.concat(result));
}

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
