const fetch = require('node-fetch');

/* transform text message into morse code */
function toMorse(text){
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
    fetch(`${endpoint}?text=${urlText}`, option)
        .then(res => {
            // if there's internet issue
            if(!res.ok){
                throw new Error("internet request issue");
            }
            return res.json();
        })
        .then(data => { 
            // change the default error message, only triggered if api connected successfully
            message = data.contents.translated;
        })
        .catch(err => {
            console.log(err);
        })

    return message;
}

module.exports = toMorse;