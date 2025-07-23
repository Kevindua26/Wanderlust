const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/WrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/user.js');

router.get('/signup', userController.renderSignupPage);

router.post('/signup', wrapAsync(userController.userSignup));

router.get('/login', userController.renderLoginPage);

router.post('/login', saveRedirectUrl,
  passport.authenticate("local", { 
    failureRedirect: '/login', 
    failureFlash: true 
  }), 
  wrapAsync(userController.userLogin)
);

router.get('/logout', userController.logoutUser);

module.exports = router;