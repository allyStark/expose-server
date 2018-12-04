const fs = require('fs-extra');

module.exports = async (req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    let dir = './logs'

    console.log(log);

    try {
        await fs.ensureDir(dir);
        fs.appendFile(`${dir}/server.log`, `${log}\n`);
    } catch (err) {
        console.log(new Error(err));
        console.log('Unable to append to server.log');
    }
    
    next();
};
