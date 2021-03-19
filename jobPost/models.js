const mongoose = require('mongoose')


const JobpostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter Job title!"],
        trim: true
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required: true
    },
    type: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        required: [true, "please enter CompanyName!"],
        trim: true
    },
    companyUrl: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        required: [true, "please enter link!"],
    },
    desccription: {
        type: String,
        trim: true
    },
    skills: {
        type: [String],
        default: []
    }
    

}, {
    timestamps: true
})

module.exports = mongoose.model("JobPosts", JobpostSchema);