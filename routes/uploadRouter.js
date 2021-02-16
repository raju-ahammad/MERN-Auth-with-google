const router = require('express').Router();

const uploadImage = require('../middleware/uploadImage')
const uploadController = require('../controllers/uploadController')

router.post('/avator',uploadImage,  uploadController.uploadAvatar)

module.exports = router