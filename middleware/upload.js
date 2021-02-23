const multer = require('multer')
const cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // async code using `req` and `file`
        // ...
        return {
          folder: 'jobup',
          allowedFormats: ["jpg", "png", "jpeg"],
          public_id: file.fieldname + '-' + Date.now()
        };
      },
    // folder: "app",
    // allowedFormats: ["jpg", "png", "jpeg"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }]
})

const upload = multer({ storage: storage });

module.exports = upload;