const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');

let {mongoose} = require('./db/mongoose');
let {Session} = require('./models/session');
let {WebExt} = require('./models/webext');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('./logs/server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'eXpose API'
    });
});

app.get('/api', (req, res) => {
    res.send({
        message: 'Hello world!',
        otherMessage: "I'm here"
    });
});

app.post('/api/webextension', (req, res) => {
    var webext = new WebExt({
        name: req.body.name,
        version: req.body.version,
        repoURL: req.body.repoURL
    });
    
    webext.save().then((doc) => {
        res.send(doc);
    }), (e) => {
        res.statue(400).send(e);
    };
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
module.exports.app = app;
