const express = require('express');
const router = express.Router();
const { login, register, resetPassword } = require('../controllers/authcontroller ');

router.post('/login', login);
router.post('/register', register);
//router.post('/reset-password', resetPassword);
//router.post('/forget-password',forgotPassword);

module.exports = router;
