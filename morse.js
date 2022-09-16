const fetch = require('node-fetch');

async function toMorse(text){
    /* the fetch option for morse */
    const option = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    /* the url endpoint for morse */
    const endpoint = "https://api.funtranslations.com/translate/morse.json"

    /* encode the text */
    const urlText = encodeURIComponent(text)

    const res = await fetch(`${endpoint}?text=${urlText}`, option);
    const data = await res.json();
    console.log(data);
    return data.contents.translated;
}

module.exports = toMorse;