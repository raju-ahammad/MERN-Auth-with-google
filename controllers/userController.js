const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env

const userController = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;
            console.log({name, email, password});
            if (!name  || !email || !password) {
                return res.json({msg: "please fill in all fields"})
            }
            if (!validateEmail(email)) {
                return res.json({msg: "invalid email!"})
            }

            const user = await Users.findOne({email});
            if (user) return res.json({msg: "this email already exist"});

            if (password.length < 6) {
                return res.json({msg: "password must be atleast 6 character"})
            }

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }
            
            const activation_token = createActivationToken(newUser);
            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url)
            res.json({msg: "Register Success! please active your mail to start"})
        } catch (err) {
            return res.status(500).json({msg: err.message})        }
    }
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
  

module.exports = userController;