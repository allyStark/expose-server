const express = require('express');
const axios = require('axios');

const handleZip = require('../services/handleZip');

const router = express.Router();

router.get('/zipball', async (req, res) => {
    try {
        // TODO change from placeholder repo
        const zipball = await axios('https://api.github.com/repos/MeoMix/StreamusChromeExtension/zipball/v0.178', { responseType: 'arraybuffer' });
        const result = await handleZip(zipball.data);
        res.send('<h1>HELLO JOE</h1>');
    } catch (err) {
        console.log('err is ', err);
        res.send(err);
    }
});

module.exports = router;