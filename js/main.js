import { game_state } from './game_state.js';
import { hangman } from './hangman.js';
import { keyboard } from './keyboard.js';
import { modalFunctions } from './modal.js';

const playAgain = document.getElementById('play-again');

hangman.init();
game_state.init();
keyboard.init();

playAgain.addEventListener('click', () => {
    modalFunctions.hide();
    hangman.reset();
    game_state.init();
    keyboard.reset();
});