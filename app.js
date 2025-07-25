if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
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
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const listingsRouter = require('./routes/listings.js');
const listingRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');
const profileRouter = require('./routes/profile.js');
const userRouter = require('./routes/user.js');

const sessionOptions = { 
  secret: "mysupersecretstring", 
  resave: false, 
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true
  }
}

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

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/demoUser', async(req, res) => {
  let fakeUser = new User({
    email: "student@gmail.com",
    username: "student"
  });

  let registeredUser = await User.register(fakeUser, "student@123");
  res.send(registeredUser);
})

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  next();
})

app.get('/', (req, res) => {
  res.send('I am root');
})

app.use("/listings", listingsRouter);
app.use("/listing", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/profile", profileRouter);
app.use("/", userRouter);

app.use("/", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found."));
})

app.use((err, req, res, next) => {
  let { statusCode=500, message="Something went wronge!" } = err;
  res.render('error.ejs', { err });
  // res.status(statusCode).send(message);
})
