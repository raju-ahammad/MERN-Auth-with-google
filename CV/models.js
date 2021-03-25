const mongoose = require('mongoose')


const CvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
    },
    aboutMe: {
        type: String,
        trim: true
    },
    contact:{
        address: {
            type: String,
            trim: true
        },
        phone:{
            type: String,
            trim: true
        }
    }

},{
    timestamps: true
})

const CV = mongoose.model('CV', CvSchema);

module.exports = CV;