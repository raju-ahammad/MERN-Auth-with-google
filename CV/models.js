const mongoose = require('mongoose')


const CvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "cv user name is required"],
        trim: true
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required: true
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
        },
        email: {
            type: String,
            trim: true
        },
        facebook: {
            type: String,
            trim: true
        },
        linkedIn: {
            type: String,
            trim: true
        },
        github: {
            type: String,
            trim: true
        }
    },
    education: {
        univarsityName: {
            type: String,
            trim: true
        },
        univarsityDept: {
            type: String,
            trim: true
        },
        univarsityYear: {
            type: String,
            trim: true
        },
        collegeName: {
            type: String,
            trim: true
        },
        collegeYear: {
            type: String,
            trim: true
        },
        schoolName: {
            type: String,
            trim: true
        },
        schoolYear: {
            type: String,
            trim: true
        }
    },
    career: {
        presentJobtitle: {
            type: String,
            trim: true
        },
        presentJobYear: {
            type: String,
            trim: true
        },
        presentJobCompany: {
            type: String,
            trim: true
        },
        presentJobdesc: {
            type: String,
            trim: true
        },
        pastJobtitle: {
            type:String,
            trim: true
        },
        pastJobYear: {
            type:String,
            trim: true
        },
        pastJobcompany: {
            type:String,
            trim: true
        },
        pastJobdesc: {
            type:String,
            trim: true
        }
    },
    skills: {
        type: [String],
        default: []
    }

},{
    timestamps: true
})

const CV = mongoose.model('CV', CvSchema);

module.exports = CV;