import { useState } from 'react';
import { uniq, bad_guesses, lives_left, guess_results } from './game';
import './App.css';

function App() {
  //secret state should be a randomly generated number (4 digits, unique digits)
  const [secret, _setSecret] = useState(randomNumber());
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");

  let lives = lives_left(secret, guesses);
  let results = guess_results(secret, guesses);

  function randomNumber() {
    let code = "";
    for (let i = 0; i <4; i+=0) {
      let num = Math.floor(Math.random() * 10);
      if (code.includes(num.toString())) {}
      else {
        code.concat(num.toString());
        i++
      }
    }
    return code;
  }

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

  if (results.includes("4A0B")) {
    return (
      <div className="App">
        <h1>You Won!</h1>
        <h1>Answer: {guesses[guesses.length -1]}</h1>
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
      <h1>Lives: {lives}</h1>
      <h1>Code: {secret} </h1>
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
}

export default App;
