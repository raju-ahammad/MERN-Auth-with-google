const mongoose = require('mongoose')


const CvSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    file_path: {
        type: String,
        required: true
    }

},{
    timestamps: true
})

const CvImage = mongoose.model('CvImage', fileSchema);

module.exports = CvImage;