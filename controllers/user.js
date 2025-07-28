const User = require('../models/user.js');
const passport = require('passport');

module.exports.renderSignupPage = (req, res) => {
  res.render('users/signup.ejs');
}

module.exports.userSignup = async(req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({
      email,
      username,
    });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", `Welcome to the Wanderlust, ${username}!`);
      res.redirect('/listings');
    })    
  } catch (e) {
    req.flash ("error", e.message);
    res.redirect('/signup');
  }
}

module.exports.renderLoginPage = (req, res) => {
  res.render('users/login.ejs');
}

module.exports.userLogin = async(req, res) => {
  req.flash("success", "Welcome back!");
  let redirectUrl = res.locals.redirectUrl || '/listings';
  res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", "Logout failed. Please try again.");
      next();
    }
    req.flash("success", "Logged out successfully.");
    res.redirect('/listings');
  })
}