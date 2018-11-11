let mongoose = require('mongoose');

let WebExt = mongoose.model('WebExt', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    version: {
        type: Number,
        required: true
    },
    repoURL: {
        type: String,
        required: true
    }

});

module.exports = {WebExt};
