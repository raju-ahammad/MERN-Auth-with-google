const CV = require("./models")

const cvController = {
    cvCreate: async (req, res) => {
        try {
            const cvPost = new CV(req.body)
            console.log(cvPost);
            await cvPost.save()
            res.json(cvPost)
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }

    }
}

module.exports = cvController