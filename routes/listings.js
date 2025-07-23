const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/WrapAsync.js');
const { isLoggedIn, validateListing } = require('../middleware.js');
const listingController = require('../controllers/listings.js');

// Index route
router.get('/', wrapAsync(listingController.index));

// New route
router.get('/new', isLoggedIn, listingController.renderNewForm);

// Show route
router.get('/:id', wrapAsync(listingController.showListing));

// Create route
router.post('/', isLoggedIn, validateListing,  wrapAsync(listingController.createNewListing));

module.exports = router;
