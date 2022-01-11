const express = require('express');
const router = express.Router();

const { register, login, forgotPassword, resetPassword } = require('../controllers/auth');

router.post('/register', register); // can also be written as router.route('/register').post(register);

router.post('/login', login);

router.post('/forgotpassword', forgotPassword);

router.post('/resetpassword/:resetToken', resetPassword);

module.exports = router;