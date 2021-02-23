const Image = require('../models/Image')
const path = require('path')


const imageControoler = {
    imageUpload: async (req, res) => {
        try {
            if (req.files && req.files.path) {
                console.log("Hello", req.files);
                const image = new Image({
                    url: req.files.path
                })
                console.log("Image", image);
                await image.save();
                return res.status(200).json({msg: "image succesfully saved", image})

            } else {
                console.log(req.file);
                return res.status(422).json({msg: "Invalid image upload"})
            }

        } catch (err) {
            return res.status(200).json({msg: err.message})
        }
    },

    getImage: async (req, res) => {
        try {
            let image = await Image.find({}, "-__v");
            return res.status(200).json({image, msg: "image info fetched"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = imageControoler