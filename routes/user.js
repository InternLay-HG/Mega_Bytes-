const express = require('express');
const router = express.Router();
const path = require('path');

const UserController = require('../controllers/usercontroller');
console.log('UserController:', UserController);

// Serve the forgot password HTML page
// You can comment this out if you don't need the page right now
// router.get('/forgot-password', (req, res) => {
//    res.sendFile(path.join(__dirname, '../public/reset-password.html')); // Adjust if your reset-password.html is in 'public' folder
// });

// Forgot Password Route
// Commenting out the forgot password route
// router.post('/forgot-password', UserController.forgotPassword);

router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
