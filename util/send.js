const fetch = require('node-fetch');

/* send message to corresponding email or phone number in .env */
const sendMessage = async (title, message, email) => {
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
                    "email": email,
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
    const res = await fetch('https://api.courier.com/send', courierOption);
    const data = await res.json();
    console.log(data);
};

module.exports = sendMessage;