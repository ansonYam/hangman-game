import { fetchWord } from './fetch.js';
import { keyboard } from './keyboard.js';
import { modalFunctions } from './modal.js';

const guesses = document.getElementById('guesses');
const blanks = document.getElementById('blanks');
const hint = document.getElementById('hint');
const gameOver = document.getElementById('game-over');

const game_state = {
    MY_HINT: '',
    MY_WORD: '',
    MAX_GUESSES: 6,
    NUM_WRONG: 0,
    blank_spaces: [],

    init: async function() {
        // grab a new random word + hint using the fetch function
        let response = await fetchWord();
        this.MY_HINT = response[0];
        this.MY_WORD = response[1];

        // reset the number of wrong guesses
        this.NUM_WRONG = 0;
        guesses.innerHTML = `Guesses remaining: ${this.MAX_GUESSES - this.NUM_WRONG} / ${this.MAX_GUESSES}`;
        
        // reset the blank spaces
        this.blank_spaces = [];
        for (let i = 0; i < this.MY_WORD.length; i++) {
            this.blank_spaces.push('_');
        }
        blanks.innerHTML = this.blank_spaces;

        // display the new hint
        hint.innerHTML = `Hint: ${this.MY_HINT}`;
    },

    update: function() {
        // update the game state (number of guesses, blanks, win / loss condition)
        guesses.innerHTML = `Guesses remaining: ${this.MAX_GUESSES - this.NUM_WRONG} / ${this.MAX_GUESSES}`;
        blanks.innerHTML = this.blank_spaces;

        if (this.NUM_WRONG === this.MAX_GUESSES) {
            gameOver.innerHTML = 'You lost!';
            keyboard.disable();
            modalFunctions.show();
        }
    
        if (!this.blank_spaces.includes('_')) {
            gameOver.innerHTML = 'You guessed it!';
            keyboard.disable();
            modalFunctions.show();
        }
    }
};

export { game_state };