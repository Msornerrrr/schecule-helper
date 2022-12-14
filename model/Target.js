const mongoose = require('mongoose');

const targetSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'course title must be provided']
    },
    section: {
        type: Number,
        min: 10000,
        max: 99999,
        require: [true, 'course section must be provided']
    },
    email: {
        type: String,
        required: [true, 'email must be provided']
    },
    type: {
        type: Number,
        min: 0,
        max: 1,
        required: [true, 'notification type must be provided']
    }
});

// index to make those four in combined unique
// already indexed
// targetSchema.index({ title: 1, section: 1, email: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Target', targetSchema);