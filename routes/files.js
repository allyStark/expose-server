const express = require('express');
const axios = require('axios');

const handleZip = require('../services/handleZip');

const router = express.Router();

router.post('/zipball', async (req, res) => {
    const zipballUrl = req.body.zipballUrl;
    console.log(zipballUrl);
    try {
        const zipball = await axios(zipballUrl, { responseType: 'arraybuffer' });
        const result = await handleZip(zipball.data);
        res.send(new Buffer(result, 'binary'));
    } catch (err) {
        console.log('err is ', err);
        res.send(err);
    }
});

module.exports = router;