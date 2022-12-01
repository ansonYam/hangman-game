// initialize the jquery plugin for each svg, per https://github.com/lcdsantos/jquery-drawsvg
let $gallows = $('#gallows').drawsvg();
let $hangman_1 = $('#hangman_1').drawsvg();
let $hangman_2 = $('#hangman_2').drawsvg();
let $hangman_3 = $('#hangman_3').drawsvg();
let $hangman_4 = $('#hangman_4').drawsvg();
let $hangman_5 = $('#hangman_5').drawsvg();
let $hangman_6 = $('#hangman_6').drawsvg();

// hangman object containing helper functions
const hangman = {
    init: function () {
        $gallows.drawsvg('animate');
    },

    update: function (number_wrong) {
        // replace this with map in the future
        eval(`$hangman_` + `${number_wrong}`).drawsvg('animate');
    },

    reset: function () {
        $gallows = $('#gallows').drawsvg();
        $hangman_1 = $('#hangman_1').drawsvg();
        $hangman_2 = $('#hangman_2').drawsvg();
        $hangman_3 = $('#hangman_3').drawsvg();
        $hangman_4 = $('#hangman_4').drawsvg();
        $hangman_5 = $('#hangman_5').drawsvg();
        $hangman_6 = $('#hangman_6').drawsvg();

        $gallows.drawsvg('animate');
    }
}

export { hangman };