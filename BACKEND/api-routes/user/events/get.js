const fs = require('fs');
const responseSender = require('../../../helpers/response-sender');

const userEventsHandlerGet = async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }
    
    const rawData = fs.readFileSync('./BACKEND/DB/events.json');
    const events = JSON.parse(rawData);
    const userEvents = events.reduce((acc, event) => {
        const isVisitor = event.visitors.some(user => user.email === email);

        if (event.creator.email === email) {
            acc.createdEvents.push(event);
        }

        if (isVisitor) {
            acc.eventsToVisit.push(event);
        }

        return acc;
    }, {
        createdEvents: [],
        eventsToVisit: []
    });

    responseSender(res, 200, 'OK!', userEvents);
};

module.exports = userEventsHandlerGet;