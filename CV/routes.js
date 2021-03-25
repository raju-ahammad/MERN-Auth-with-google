const cvController = require('./controller');

const router = require('express').Router();


router.post('/createcv', cvController.cvCreate)

module.exports = router