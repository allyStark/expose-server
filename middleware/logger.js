const fs = require('fs');

module.exports = (req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('./logs/server.log', log + '\n', (err) => {
        console.log(new Error(err));
        console.log('Unable to append to server.log');
    });
    next();
};