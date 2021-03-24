const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        console.log("des");
        cb(null, '../uploads/')
    },
    filename: (req, file, cb) => {
        console.log("Hello middle");
        console.log("File",file);
        cb(null, 'congar'+'-'+Date.now()+ path.extname(file.originalname))

    }
})


console.log("Hello");

const fileFilter = (req, res, cb) => {
    console.log("Filter");
    cb(null, true)
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload