export function uniq(xs) {
    return Array.from(new Set(xs));
}

export function word_view(secret, guesses) {
    let view = [];
    for (let cc of secret.split('')) {
        if (guesses.includes(cc)) {
            view.push(cc);
        }
        else {
            view.push("_");
        }
    }
    return view;
}

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

export function lives_left(secret, guesses) {
    return 8 - bad_guesses(secret, guesses).length;
}