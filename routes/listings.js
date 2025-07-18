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

// Index route
router.get('', wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index.ejs', { allListings });
}))

// New route
router.get('/new', (req, res) => {
  res.render('listings/new.ejs');
})

// Show route
router.get('/:id', wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate('review');
  res.render('listings/show.ejs', { listing });
}))

// Create route
router.post('/',validateListing,  wrapAsync(async (req, res, next) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save()
  res.redirect('/listings');
}))




module.exports = router;
