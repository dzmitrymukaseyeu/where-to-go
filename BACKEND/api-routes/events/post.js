const fs = require('fs');
const sha1 = require('sha1');
const responseSender = require('../../helpers/response-sender');

const eventsHandlerPost = async (req, res) => {
    const eventToSave = req.body;

    if (
        !eventToSave.type
        || !eventToSave.title
        || !eventToSave.description
        || !eventToSave.date
        || !eventToSave.creator
        || !eventToSave.creator.firstName
        || !eventToSave.creator.lastName
        || !eventToSave.creator.email
        || !eventToSave.visitors
        || !eventToSave.visitors.length
        || !eventToSave.visitors[0].firstName
        || !eventToSave.visitors[0].lastName
        || !eventToSave.visitors[0].email
        || eventToSave.creator.email !== eventToSave.visitors[0].email
        || Object.keys(eventToSave).length !== 6
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    const rawEventsData = fs.readFileSync('./BACKEND/DB/events.json');
    const rawUsersData = fs.readFileSync('./BACKEND/DB/users.json');
    const events = JSON.parse(rawEventsData);
    const users = JSON.parse(rawUsersData);
    const user = users.find(user => user.email === eventToSave.creator.email);

    if (!user) {
        return responseSender(res, 404, 'User not found!');
    }

    eventToSave.id = sha1(Date.now());
    
    events.push(eventToSave);
    user.createdEvents.push(eventToSave.id);
    user.eventsToVisit.push(eventToSave.id);

    try {
        fs.writeFileSync('./BACKEND/DB/events.json', JSON.stringify(events));
        fs.writeFileSync('./BACKEND/DB/users.json', JSON.stringify(users));
        responseSender(res, 200, 'The new event created!', eventToSave);

    } catch (err) {
        responseSender(res, 500, err.message);
    }  
};

module.exports = eventsHandlerPost;