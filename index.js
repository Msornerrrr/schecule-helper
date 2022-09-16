const toMorse = require('./morse');
const fetch = require('node-fetch');
require('dotenv').config();


// get morse code of text provided
const message = toMorse("Hey there, Can you understand?");

/* the fetch option for courier */
const courierOption = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.APIKEY
    },
    body: JSON.stringify({
        "message": {
            "to": {
                "email": process.env.EMAIL,
                "phone_number": process.env.PHONENUMBER
            },
            "content": {
                "title": "new secret subject",
                "body": message
            },
            "routing": {
                "method": "single",
                "channels": ["sms", "email"]
            },
        }
    })
};

fetch('https://api.courier.com/send', courierOption)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
