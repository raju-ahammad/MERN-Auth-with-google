const router = require('express').Router();

const uploadImage = require('./middleware')

const cvController = require('./controller')

router.post('/cvimage', uploadImage.single('cvImage'), cvController.imageUpload)

module.exports = router