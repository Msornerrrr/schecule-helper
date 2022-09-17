const fetch = require('node-fetch');

/* transform text message into morse code */
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
    const endpoint = "https://api.funtranslations.com/translate/morse.json";

    /* encode the text */
    const urlText = encodeURIComponent(text);

    let message = "app currently under repairing or internet issue...";
    const res = await fetch(`${endpoint}?text=${urlText}`, option);
    if(!res.ok){
        throw new Error("internet request issue");
    }
    const data = await res.json();
    message = data.contents.translated;

    return message;
}

module.exports = toMorse;