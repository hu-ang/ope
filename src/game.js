//make the given array into a set
export function uniq(xs) {
    return Array.from(new Set(xs));
}

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
export function guess_results(secret, guesses) {
    //A -> right number right place
    //B -> right number wrong place
    let targetDigits = secret.split('');
    let finalResult = [];
    let result = "";
    for (let gg of guesses) {
        let guessDigits = gg.split('');
        result  = "";
        let numA = 0;
        let numB = 0;
        for (let i =0; i < gg.length; i++) {
            if (targetDigits[i] == guessDigits[i]) {
                numA++;
            }
            else if (targetDigits.includes(guessDigits[i])) {
                numB++;
            }
            else {}
        }
        result = result.concat(numA.toString() + "A" + numB.toString() + "B");
        finalResult = finalResult.concat(result);
    }
    return finalResult;
}