const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'eXpose API'
    });
});

module.exports = router;