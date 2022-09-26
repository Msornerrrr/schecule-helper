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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user must be provided']
    },
    type: {
        type: Number,
        min: 0,
        max: 1,
        required: [true, 'notification type must be provided']
    }
});

// targetSchema.index({ title: 1, section: 1, user: 1, type: 1 }, { unique: false });

module.exports = mongoose.model('Target', targetSchema);