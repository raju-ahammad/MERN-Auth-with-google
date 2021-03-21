const JobPost = require('./models')
const Users = require('../models/userModel');

const jobPostController = {
    jobPost: async (req, res) => {
        try {
            const userId = req.user.id;
            
            const post = new JobPost({
                ...req.body,
                user: userId
            })
            console.log(post);
            await post.save();

            const userById = await Users.findById(userId);
            userById.jobPosts.push(post)
            await userById.save()
            console.log(userById);
            res.json(post)
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    getAllJob: async (req, res) => {
        try {
            const job = await JobPost.find().sort({ createdAt: 'desc'}).populate('user');
            res.json(job)
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    getjob: async (req, res) => {
        try {
            const jobId = req.params.jobId;
          
            const job = await JobPost.findById(jobId).populate('user')
            
            res.json(job)
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    updateJob: async (req, res) => {
        const id = req.params.jobId;
        try {
            const job = await JobPost.findOneAndUpdate({
                _id: id,
                user: req.user.id
            },
            req.body,
            {
                new: true
            }
            )
            console.log(job);
            if (!job) return res.status(404).json({msg: "Job not found"})
            res.json(job)
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    deleteJob: async (req, res) => {
        const id = req.params.jobId;
        try {
            const job = await JobPost.findOneAndDelete({
                _id: id,
                user: req.user.id
            })
            if (!job) return res.status(404).json({msg: "Job not found"})

            res.json({msg: "job deleted"})
            res.send(job)
        } catch (err) {
            return res.status(500).json()
        }
    }

}

module.exports = jobPostController