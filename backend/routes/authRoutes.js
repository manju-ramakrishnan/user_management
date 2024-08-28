const express = require('express');
const { signupController, loginController } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signupController); //signup rotue
router.post('/login', loginController); //login route

module.exports = router;
