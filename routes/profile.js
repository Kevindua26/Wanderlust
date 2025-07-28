const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const Listing = require("../models/listing.js");

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(id);
    let listing = await Listing.find({ owner: id });
    res.render("users/profile.ejs", { user, listing });
  })
);

module.exports = router;
