let mongoose = require('mongoose');

let Session = mongoose.model('Session', {
    user: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {Session};
