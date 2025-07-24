const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/WrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/user.js');

router.route('/signup')
  .get(userController.renderSignupPage)
  .post(wrapAsync(userController.userSignup));

router.route('/login')
  .get(userController.renderLoginPage)
  .post(saveRedirectUrl,
  passport.authenticate("local", { 
    failureRedirect: '/login', 
    failureFlash: true 
  }), 
  wrapAsync(userController.userLogin)
);

router.get('/logout', userController.logoutUser);

module.exports = router;