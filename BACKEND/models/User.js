const mongoose = require('mongoose');

const UserSchema = mongoose.Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events'
    }],
    eventsToVisit: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events'
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;