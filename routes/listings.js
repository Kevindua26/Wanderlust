const express = require('express');
const router = express.Router();
const multer = require('multer');
const wrapAsync = require('../utils/WrapAsync.js');
const { isLoggedIn, validateListing } = require('../middleware.js');
const listingController = require('../controllers/listings.js');

const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

router.route('/')
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn, 
    upload.single('listing[image]'), 
    validateListing, 
    wrapAsync(listingController.createNewListing)
  );

// New route
router.get('/new', isLoggedIn, listingController.renderNewForm);

// Show route
router.get('/:id', wrapAsync(listingController.showListing));

module.exports = router;
