import { useState } from 'react';
import { uniq, bad_guesses, lives_left, guess_results } from './game';
import './App.css';

function App() {
  const [secret, setSecret] = useState(randomNumber());
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");

  let lives = lives_left(secret, guesses);
  let results = guess_results(secret, guesses);

  //generate a random 4-digit number with unique digits
  function randomNumber() {
    let code = "";
    for (let i = 0; i <4; i+=0) {
      let num = Math.floor(Math.random() * 10);
      if (code.includes(num.toString())) {}
      else {
        code = code.concat(num.toString());
        i++
      }
    }
    return code;
  }

  //reset the game with a new secret code
  function resetGame() {
    setGuesses([]);
    setSecret(randomNumber());
  }

  function updateGuess(ev) {
    let text = ev.target.value;
    if (text.length > 4) {
      text = text.substring(0, 4);
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
          <button onClick={() => resetGame()}>
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
          <button onClick={() => resetGame()}>
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
      <h1>Code: {secret}</h1>
      <p>
        <table class="center">
          <tr>
            <th>Guesses</th>
            <th>Results</th>
          </tr> 
          <div>{guesses.map((value, index) => {
            return <tr><td>{value}</td><td>{results[index]}</td></tr>
          })}</div>
        </table>
      </p>
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
        <button onClick={() => resetGame()}>
          Reset
        </button>
      </p>
    </div>
  );
}

export default App;
