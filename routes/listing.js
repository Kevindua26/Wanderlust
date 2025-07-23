const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/WrapAsync.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require('../controllers/listings.js');

// Edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update route
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// Delete route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;