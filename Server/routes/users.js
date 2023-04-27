const router = require('express').Router();
const UserController = require('../controllers/userController');

// Home Page Register and Login
router.post('/register', UserController.registerUserAdmin)
router.post('/login', UserController.loginUser)
router.post('/login-with-google', UserController.googleLoginUser)

module.exports = router;

