/* grab DOM elements */
const hangman = document.getElementById('hangman');
const guesses = document.getElementById('guesses');
const blanks = document.getElementById('blanks');
const hint = document.getElementById('hint');
const keyboardButtons = document.querySelectorAll('#keyboard > .row > button');
const modal = document.getElementById('modal');
const gameOver = document.getElementById('game-over');
const playAgain = document.getElementById('again');

/* global variables for the randomly-selected word and its hint */
let MY_WORD = '';
let MY_HINT = '';

let blank_spaces = [];
let MAX_GUESSES = 6;
let NUM_GUESSES = 6;

// initialize the jquery plugin for each svg, per https://github.com/lcdsantos/jquery-drawsvg
let $gallows = $('#gallows').drawsvg();
// this can be a loop maybe, or not 
let $hangman_1 = $('#hangman_1').drawsvg();
let $hangman_2 = $('#hangman_2').drawsvg();
let $hangman_3 = $('#hangman_3').drawsvg();
let $hangman_4 = $('#hangman_4').drawsvg();
let $hangman_5 = $('#hangman_5').drawsvg();
let $hangman_6 = $('#hangman_6').drawsvg();
$gallows.drawsvg('animate');

// game start, will be called many times
function start() {
    /* Thanks to https://github.com/le717/PHP-Hangman/blob/master/words/word-list.json */
    fetch('word-list.json')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Network error: fetch failed");
            }
        })
        .then(function (data) {
            let word_count = data.length;
            let random_index = Math.floor(Math.random() * word_count);
            MY_WORD = data[random_index].word;
            MY_HINT = data[random_index].hint;

            /* move this to an external function later */
            for (let i = 0; i < MY_WORD.length; i++) {
                blank_spaces.push('_');
            }
            guesses.innerHTML = `Guesses remaining: ${NUM_GUESSES} / ${MAX_GUESSES}`;
            blanks.innerHTML = blank_spaces;
            hint.innerHTML = `Hint: ${MY_HINT}`;

        })
        .catch(function (error) {
            console.log(error);
        })
}

start();

keyboardButtons.forEach((keyboardButton) => {
    keyboardButton.addEventListener('click', () => {

        /*make the game logic a separate function */
        let matchFound = false;
        for (let i = 0; i < MY_WORD.length; i++) {
            if (MY_WORD[i] === keyboardButton.value || MY_WORD[i] === keyboardButton.value.toUpperCase()) {
                blank_spaces[i] = MY_WORD[i];
                matchFound = true;
            }
        }

        blanks.innerHTML = blank_spaces;

        // decrement number of guesses
        if (!matchFound) {
            NUM_GUESSES--;
            guesses.innerHTML = `Guesses remaining: ${NUM_GUESSES} / ${MAX_GUESSES}`;
            // seems like the guys at s/o really don't like eval(),
            // replace with a LUT later (1 wrong = head, 2 wrong = torso, etc)
            eval(`$hangman_` + `${MAX_GUESSES - NUM_GUESSES}`).drawsvg('animate');
        }

        keyboardButton.disabled = true;
        evaluateGameState();
    })
});

function evaluateGameState() {
    if (NUM_GUESSES == 0) {
        gameOver.innerHTML = 'You lost!';
        keyboardButtons.forEach((keyboardButton) => {
            keyboardButton.disabled = true;
        });
        modal.style.opacity = 1;
        modal.style.visibility = 'visible';
    }

    if (!blank_spaces.includes('_')) {
        gameOver.innerHTML = 'You guessed it!';
        modal.style.opacity = 1;
        modal.style.visibility = 'visible';
    }
}

function updateGameState() {
    // do stuff here when not tired
}

playAgain.addEventListener('click', () => {
    /* make this reset a separate function */
    blank_spaces = [];
    NUM_GUESSES = 6;
    keyboardButtons.forEach((keyboardButton) => {
        keyboardButton.disabled = false;
    });
    shuffleKeyboard(); // works fine
    resetSVG();

    modal.style.opacity = 0;
    modal.style.visibility = 'hidden';
    start();
});

function resetSVG() {
    $gallows = $('#gallows').drawsvg();
    $hangman_1 = $('#hangman_1').drawsvg();
    $hangman_2 = $('#hangman_2').drawsvg();
    $hangman_3 = $('#hangman_3').drawsvg();
    $hangman_4 = $('#hangman_4').drawsvg();
    $hangman_5 = $('#hangman_5').drawsvg();
    $hangman_6 = $('#hangman_6').drawsvg();
    $gallows.drawsvg('animate');
}


let letters = [];
keyboardButtons.forEach((keyboardButton) => {
    letters.push(keyboardButton.value);
});

document.addEventListener('keydown', (event) => {
    if (letters.includes(event.key)) {
        let keyboardButton = document.querySelector(`button[value=${event.key}]`);
        keyboardButton.click();
    }
})

/* neat animation from CSS tricks: https://css-tricks.com/staggering-animations/ */
let moved = false;

function shuffleKeyboard() {
    moved = !moved;
    for (let i = 0; i < keyboardButtons.length; i++) {
        setTimeout(function () {
            let keyboardButton = keyboardButtons[i];
            keyboardButton.classList.toggle('moved');
        }, i * 50);
    }
}