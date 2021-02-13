const router = require('express').Router();

const userController = require("../controllers/userController");
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userController.register)

router.post('/activation', userController.activeEmail)

router.post('/login', userController.login)

router.post('/refresh_token', userController.getAccessToken)

router.post('/forgotpassword', userController.forgotPassword)

router.post('/resetpassword', auth,  userController.resetPassword)

router.get('/infor', auth, userController.getUserInfor)

router.get('/alluserinfo', auth, authAdmin, userController.getAlluserInfo)

router.get('/logout', userController.logout)


module.exports = router;
