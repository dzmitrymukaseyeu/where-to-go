const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 5000;
const isProd = process.argv.includes('--prod');

const signUpHandlerPost = require('./BACKEND/api-routes/sign-up/post');
const signInHandlerPost = require('./BACKEND/api-routes/sign-in/post');

const userHandlerGet = require('./BACKEND/api-routes/user/get');
const userEventsHandlerGet = require('./BACKEND/api-routes/user/events/get');

const eventsHandlerGet = require('./BACKEND/api-routes/events/get');
const eventsHandlerPost = require('./BACKEND/api-routes/events/post');
const eventsGoHandlerPost = require('./BACKEND/api-routes/events/go/post');

app.use(cors())
app.use(bodyParser.json())

// Auth routes
app.post('/api/sign-up', signUpHandlerPost);
app.post('/api/sign-in', signInHandlerPost);

// User route
app.get('/api/user', userHandlerGet);
app.get('/api/user/events', userEventsHandlerGet);

// Events routes
app.get('/api/events', eventsHandlerGet);
app.post('/api/events', eventsHandlerPost);
app.post('/api/events/go', eventsGoHandlerPost);


if (isProd) {
    // running seed 
}

app.listen(process.env.PORT || PORT, () =>
    console.log(`Server is running on port ${process.env.PORT || PORT}`)
);

