const fetch = require('node-fetch');

/* send message to corresponding email or phone number in .env */
function sendMessage(title, message){
    /* do some validation for message */
    if(!title || !message) return;

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
                    "title": title,
                    "body": message
                },
                "routing": {
                    "method": "single",
                    "channels": ["email", "sms"]
                },
            }
        })
    };

    fetch('https://api.courier.com/send', courierOption)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}

module.exports = sendMessage;