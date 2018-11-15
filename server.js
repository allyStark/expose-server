const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let {mongoose} = require('./db/mongoose');
let {Session} = require('./models/session');
let {WebExt} = require('./models/webext');

var bodyParser = require('body-parser');
var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store,{
    freeRetries: 50,
    lifetime: 3600
});
const sandBox = require('./docker/DockerSandbox');
var arr = require('./docker/compilers');

function random(size) {
    //returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex');
}

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

app.post('/api/webextensions', (req, res) => {
    var webext = new WebExt({
        name: req.body.name,
        version: req.body.version,
        repoURL: req.body.repoURL
    });

    webext.save().then((doc) => {
        res.send(doc);
    }), (e) => {
        res.status(400).send(e);
    };
});

app.post('/compile',bruteforce.prevent,function(req, res)
{
    debugger;
    var language = req.body.language;
    var code = req.body.code;
    var stdin = req.body.stdin;

    var folder= 'temp/' + random(10); //folder in which the temporary folder will be saved
    var path=__dirname+"/"; //current working path
    var vm_name='virtual_machine'; //name of virtual machine that we want to execute
    var timeout_value=20;//Timeout Value, In Seconds
    debugger;
    //details of this are present in DockerSandbox.js
    var sandboxType = new sandBox(timeout_value,path,folder,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);


    //data will contain the output of the compiled/interpreted code
    //the result maybe normal program output, list of error messages or a Timeout error
    sandboxType.run(function(data,exec_time,err)
    {
        //console.log("Data: received: "+ data)
    	res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
    });

});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

module.exports = {app};
