const router = require('express').Router();

const userController = require("../controllers/userController");
const auth = require('../middleware/auth')

router.post('/register', userController.register)

router.post('/activation', userController.activeEmail)

router.post('/login', userController.login)

router.post('/refresh_token', userController.getAccessToken)

router.post('/forgotpassword', userController.forgotPassword)

router.post('/resetpassword', auth,  userController.resetPassword)


module.exports = router;
