require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/WrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('./schema.js');

const listings = require('./routes/listings.js');
const listing = require('./routes/listing.js');
const reviews = require('./routes/review.js');

// mongoDB connection
if (!process.env.MONGO_URL) {
  console.error('MONGO_URL is not defined in .env file');
}
const MONGO_URL = process.env.MONGO_URL;

main().then(() => {
  console.log('Connected to MongoDB\n');
}).catch((err) => {
  console.log(err);
})

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(PORT, () => {
  console.log(`\nServer is running on port ${PORT}\nVisit http://localhost:${PORT}/listings \n`);
})

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded( { extended: true } ));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
  res.send('I am root');
})

app.use("/listings", listings);
app.use("/listing", listing);
app.use("/listings/:id/reviews", reviews);

app.use("/", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found."));
})

app.use((err, req, res, next) => {
  let { statusCode=500, message="Something went wronge!" } = err;
  res.render('error.ejs', { err });
  // res.status(statusCode).send(message);
})
