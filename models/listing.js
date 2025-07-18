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
    type: String,
    default: "https://plus.unsplash.com/premium_photo-1734545294150-3d6c417c5cfb?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) => 
      v === "" 
        ? "https://plus.unsplash.com/premium_photo-1734545294150-3d6c417c5cfb?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        : v,
  },
  price: Number,
  location: String,
  country: String,
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ]
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