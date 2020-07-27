const fs = require('fs');
const responseSender = require('../../../helpers/response-sender');

const eventsHandlerPost = async (req, res) => {
    const { id, email } = req.body;

    if (
        !id
        || !email
        || Object.keys(req.body).length !== 2
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    const rawUsersData = fs.readFileSync('./BACKEND/DB/users.json');
    const rawEventsData = fs.readFileSync('./BACKEND/DB/events.json');
    let users = JSON.parse(rawUsersData);
    let events = JSON.parse(rawEventsData);

    const user = users.find(u => u.email === email);
    const event = events.find(e => e.id === id);

    if (!user || !event) {
        return responseSender(res, 404, 'Wrong data sent!');
    }

    if (user.eventsToVisit.includes(id)) {
        return responseSender(res, 409, 'You have already signed up for the event!');
    }

    users = users.map(u => {
        if (u.email === email) {
            u.eventsToVisit.push(id);
        }

        return u;
    });

    events = events.map(e => {
        if (e.id === id) {
            e.visitors.push({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });
        }

        return e;
    });

    try {
        fs.writeFileSync('./BACKEND/DB/events.json', JSON.stringify(events));
        fs.writeFileSync('./BACKEND/DB/users.json', JSON.stringify(users));
        responseSender(res, 200, 'You signed up for the event!');

    } catch (err) {
        responseSender(res, 500, err.message);
    }  
};

module.exports = eventsHandlerPost;