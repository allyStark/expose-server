const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
// Models
//let { mongoose } = require('./db/mongoose');
let { Session } = require('./models/session');
let { WebExt } = require('./models/webext');
// Routes
const main = require('./routes/main');
const api = require('./routes/api');
const compilebox = require('./routes/compilebox');
const files = require('./routes/files');
// Middleware
const logger = require('./middleware/logger');
var bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

let app = express();

/*
    View Engine
*/
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

/*
    Middleware
*/
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

/*
    Custom Middleware
*/
app.use(logger);

/*
    Routes
*/
app.use('/', main);
app.use('/files', files);
app.use('/compilebox', compilebox);
app.use('/api', api);

/*
    Listen
*/
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

module.exports = { app };
