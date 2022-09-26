const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided for user']
    },
    email: {
        type: String,
        required: [true, 'email must be provided for user'],
    },
    password: { 
        type: String,
        required: [true, 'password must be provided for user'] 
    }
});

module.exports = mongoose.model('User', userSchema)