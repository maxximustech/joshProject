const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/sign-up',authController.getSignUpPage);
router.post('/sign-up',authController.postSignUp);
router.get('/login',authController.getLoginPage);
router.post('/login',authController.postLogin);
router.get('/logout',authController.logOut);

module.exports = router;