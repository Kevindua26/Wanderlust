const express = require('express');
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/WrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const router = express.Router();

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); // Accessing Joi 

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

// Edit route
router.get('/:id/edit', wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you are requesting doesn't exist.");
    return res.redirect('/listings');
  }
  res.render('listings/edit.ejs', { listing });
}))

// Update route
router.put('/:id',validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  req.flash("updated", "Listing Updated");
  res.redirect(`/listings/${id}`);
}))

// Delete route
router.delete('/:id', wrapAsync(async (req, res) => {
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("deleted", "Listing Deleted");
  res.redirect('/listings');
}))

module.exports = router;