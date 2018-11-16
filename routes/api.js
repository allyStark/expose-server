const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
    res.send({
        message: 'Hello world!',
        otherMessage: "I'm here"
    });
});

router.post('/api/webextensions', (req, res) => {
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

module.exports = router;