const cloudinary = require('cloudinary')
require('dotenv')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.COUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

console.log(process.env.COUD_API_KEY);

// const uploadFolder = (file, folder) => {
//     return cloudinary.v2.uploader.upload(file.tempFilePath, {
//         folder: folder, width: 150, height: 150, crop: "fill"
//     }, async(err, result) => {
//         if(err) throw err;
//         console.log("Result",result);

//         removeTmp(file.tempFilePath)

//         res.json({url: result.secure_url})
//     })
// }

const uploadController = {
    uploadAvatar: (req, res) => {
        try {
            const file = req.files.file;
            console.log("Cntrl", file);
            uploadFolder(file, "Avator")
            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'avatar', width: 150, height: 150, crop: "fill"
            }, async(err, result) => {
                if(err) throw err;
                console.log("Result",result);

                removeTmp(file.tempFilePath)

                res.json({url: result.secure_url})
            })
        
        } catch (err) {
            console.log("Error");
            return res.status(500).json({msg: err})
        }
    }

}


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}
module.exports = uploadController;