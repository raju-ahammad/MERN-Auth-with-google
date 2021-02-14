const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail');
const { reset } = require('nodemon');

const {CLIENT_URL} = process.env

const userController = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;
            
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
            sendMail(email, url, "please verify your email")
            res.json({msg: "Register Success! please active your mail to start"})
        } catch (err) {
            return res.status(500).json({msg: err.message})        }
    },
    activeEmail: async (req, res) => {
        try {
            const { activation_token } = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
            
            const { name, email, password } = user;
            const checkMail = await Users.findOne({email});
            if (checkMail) {
                return res.status(400).json({msg: "this mail already exist"})
            }

            const newUser = new Users({
                name, email, password
            })

            await newUser.save()

            return res.json({msg: "Account has been activate "})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }, 
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 24 hours
            })

            res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({msg: "please log in now!"})
             jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                 if (err) return res.status(400).json({msg: "please log in now!"})
                 const access_token = createAccessToken({id: user.id})
                 res.json({access_token})
             })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body;
            const user = await Users.findOne({email});
            if (!user) {
                return res.status(400).json({msg: "this email does not exist"})
            }

            const access_token = createAccessToken({id: user._id});
            console.log(access_token);
            const url = `${CLIENT_URL}/user/reset/${access_token}`
            sendMail(email, url, "Reset your password")
            res.json({msg: "Resend the password, please check your email"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword : async (req, res) => {
        try {
            const {password} = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            console.log(req.user);
            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAlluserInfo: async (req, res) => {
        try {
            const users = await Users.find().select('-password')
            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {name, avator} = req.body

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                name, avator
            }) 

            res.json({msg: "Update sucess"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUserRole: async (req, res) => {
        try {
            const { role } = req.body

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                role
            }) 

            res.json({msg: "Update Role Sucess!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Delete Successs"})
        } catch (err) {
            return res.status(500).json({msg: res.message})
        }
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