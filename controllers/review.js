const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.createNewReview = async(req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  
  listing.review.push(newReview);
  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing.id}#comment-section`);
}

module.exports.deleteReview = async(req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: { review: reviewId}});
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}#comment-section`);
}