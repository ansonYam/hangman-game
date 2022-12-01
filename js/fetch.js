const FILE_PATH = 'data/word-list.json';

// list generated here: https://randomwordgenerator.com/hangman.php
async function fetchWord() {
    return fetch(FILE_PATH)
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
            return [data[random_index].hint, data[random_index].word];
        })
        .catch(function (error) {
            console.log(error);
        })
}

export { fetchWord };
