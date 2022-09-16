const sendMessage = require('./send');
const toMorse = require('./morse');

require('dotenv').config();

// get morse code of text provided
const title = "a secret message";
const message = toMorse("Hey there, Can you understand?");
sendMessage(title, message);
