//make the given array into a set
export function uniq(xs) {
    return Array.from(new Set(xs));
}

//the view of the current state of guessing 
// export function word_view(secret, guesses) {
//     let view = [];
//     for (let cc of secret.split('')) {
//         if (guesses.includes(cc)) {
//             view.push(cc);
//         }
//         else {
//             view.push("_");
//         }
//     }
//     return view;
// }

//return a set of the invalid guesses made so far
export function bad_guesses(secret, guesses) {
    let letters = secret.split('');
    let bads = [];
    for (let gg of guesses) {
        if (!letters.includes(gg)) {
            bads.push(gg);
        }
    }
    return uniq(bads);
}

//calculate the number of lives left
export function lives_left(secret, guesses) {
    return 8 - bad_guesses(secret, guesses).length;
}

//create the hint/result for the given guess and append to 
// guessResults (a new array)
export function guess_results(secret, guessResults, guess) {
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
    //setGuessResults(uniq(guessResults.concat(result)));
    return uniq(guessResults.concat(result));
}