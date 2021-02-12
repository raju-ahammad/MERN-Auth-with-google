const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "please enter your name!"],
        trim: true
    },
    email : {
        type: String,
        required: [true, "please enter your email!"],
        trim: true,
        unique: true
    },
    password : {
        type: String,
        required: [true, "please enter your password!"],
    },
    role : {
        type: Number,
        default: 0 // 0 = user , 1 = admin
    },
    avator : {
        type: String,
        default: "https://res.cloudinary.com/dlywsncdd/image/upload/v1612908202/51f6fb256629fc755b8870c801092942_tmy0yx.png"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Users", userSchema);