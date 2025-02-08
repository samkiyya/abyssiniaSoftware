// routes/Routes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/', reviewController.createReview);

// Get all reviews for a product
router.get('/:productId', reviewController.getReviewsByProductId);

// Get average rating for a product
router.get('/average/:productId', reviewController.getAverageRating);

// Update a review by ID
router.put('/:id', reviewController.updateReview);

// Delete a review by ID
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
