const mongoose = require('mongoose');

const EventSchema = new Schema ({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    bgImage: {
        type: String,
        required: true
    },
    visitors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;