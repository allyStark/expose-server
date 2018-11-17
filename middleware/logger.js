const fs = require('fs');

module.exports = (req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.mkdir('./logs', { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.appendFile('./logs/server.log', log + '\n', (err) => {
        if (err) {
            console.log(new Error(err));
            console.log('Unable to append to server.log');
        }
    });
    next();
};
