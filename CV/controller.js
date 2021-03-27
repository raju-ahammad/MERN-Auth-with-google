const CV = require("./models")
const Users = require('../models/userModel');


const cvController = {
    cvCreate: async (req, res) => {
        try {
            const userId = req.user.id;
            
            const userSearchById = await Users.findById(userId)
            
            if (userSearchById.cv) {
                console.log("Already you have an cv update your cv");
                return res.json({msg: "Already you have an cv update your cv"})
            }else {
               
                const cvPost = new CV({
                    ...req.body,
                    user: userId
                })
                console.log(cvPost);
                await cvPost.save()
    
                const userById = await Users.findById(userId);
                console.log("userBy iD",userById);
                userById.cv = cvPost
                await userById.save()
                
                res.json(cvPost)
            }
            
            
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }

    },
    getAllCv: async (req, res) => {
        try {
            const cv = await CV.find().sort({ createdAt: 'desc'}).populate('user');
            res.json(cv)
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    getSingleCv: async (req, res) => {
        try {
            const cvId = req.params.cvid
            const cv = await CV.findById(cvId).populate('user')
            res.json(cv)
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    updateCv: async (req, res) => {
        try {
            const reqCvId = req.params.id
            const userId = req.user.id
            const userInfo = await Users.findById(userId).populate('cv');
            const userCvId = userInfo.cv._id.toString()

            console.log("cvId", reqCvId);
            console.log("userCv",userCvId);
            if (reqCvId !== userCvId) return res.json({msg: "Cv user is not valid"})


            const filter = {
                _id: reqCvId,
                user: req.user.id
            }

            const update = req.body

            const cvUpdate = await CV.findByIdAndUpdate(filter, update, { new: true })
            console.log(cvUpdate);
            if (!cvUpdate) return res.status(404).json({msg: "Job not found"})
            res.json(cvUpdate)
        } catch (error) {
            return res.status(500).json({msg: err.message}) 
        }
    }
}

module.exports = cvController