const fs = require('fs');
const path = require('path');
const appRootPath = require('app-root-path').path;
const responseSender = require('../../helpers/response-sender');

const eventsHandlerGet = async (req, res) => {
    const rawData = fs.readFileSync(path.join(appRootPath, '/BACKEND/DB/events.json'));
    const events = JSON.parse(rawData);
    const id = req.query.id;

    if (id) {
        const event = events.find(evt => evt.id === id);

        return event
            ? responseSender(res, 200, 'Got it!', event)
            : responseSender(res, 404, 'Event not found!');  
    }

    responseSender(res, 200, 'Got it!', events);    
};

module.exports = eventsHandlerGet;