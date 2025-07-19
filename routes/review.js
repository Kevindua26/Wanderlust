const express = require('express');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const wrapAsync = require('../utils/WrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const router = express.Router({ mergeParams: true });

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body); // Accessing Joi 

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

// Reviews
// Post review route
router.post('/', validateReview, wrapAsync(async(req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.review.push(newReview);
  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing.id}#comment-section`);
}))

// Delete review route
router.delete('/:reviewId', wrapAsync(async(req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: { review: reviewId}});
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}#comment-section`);
}))

module.exports = router;