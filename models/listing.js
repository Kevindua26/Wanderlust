const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

listingSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.review
      }
    })
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;