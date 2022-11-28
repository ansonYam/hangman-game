import { game_state } from "./game_state.js";
import { hangman } from "./hangman.js";

const keyboardButtons = document.querySelectorAll('#keyboard > .row > button');
let letters = [];
keyboardButtons.forEach((keyboardButton) => {
    letters.push(keyboardButton.value);
});

const keyboard = {
    init: function () {
        // add event listeners here
        keyboardButtons.forEach((keyboardButton) => {
            keyboardButton.addEventListener('click', () => {
                let matchFound = false;
                for (let i = 0; i < game_state.MY_WORD.length; i++) {
                    if (game_state.MY_WORD[i].toLowerCase() === keyboardButton.value) {
                        game_state.blank_spaces[i] = game_state.MY_WORD[i];
                        matchFound = true;
                    }
                }
                if (!matchFound) {
                    game_state.NUM_WRONG++;
                    hangman.update(game_state.NUM_WRONG);
                }
                game_state.update();
                keyboardButton.disabled = true;
            })
        });
        
        document.addEventListener('keydown', (event) => {
            if (letters.includes(event.key)) {
                let keyboardButton = document.querySelector(`button[value=${event.key}]`);
                keyboardButton.click();
            }
        })
    },

    disable: function() {
        keyboardButtons.forEach((keyboardButton) => {
            keyboardButton.disabled = true;
        });
    },

    reset: function () {
        /* neat animation from CSS tricks: https://css-tricks.com/staggering-animations/ */
        for (let i = 0; i < keyboardButtons.length; i++) {
            setTimeout(function () {
                let keyboardButton = keyboardButtons[i];
                keyboardButton.classList.toggle('moved');
                keyboardButton.disabled = false;
            }, i * 50);
        }
    }
};

export { keyboard };