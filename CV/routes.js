const cvController = require('./controller');

const auth = require('../middleware/auth')
const router = require('express').Router();


router.post('/createcv',auth, cvController.cvCreate)
router.get('/getcv/:cvid', cvController.getSingleCv)
router.get('/getallcv', cvController.getAllCv)
router.put('/updatecv/:id', auth, cvController.updateCv)

module.exports = router