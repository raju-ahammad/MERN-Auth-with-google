const mongoose = require('mongoose');

const ImageUser = new mongoose.Schema({
    name: {
        type: String
    },
    avator: {
        type: String
    },
    cloudinaryId: {
        type: String
    }
});

module.exports = mongoose.model('imageuser', ImageUser);