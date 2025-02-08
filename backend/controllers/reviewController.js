// controllers/reviewController.js
const Review = require('../models/review');
const Product = require('../models/product');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = await Review.create({ productId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

// Get all reviews for a product
const getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const reviews = await Review.findAll({ where: { productId } });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get average rating for a product
const getAverageRating = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const reviews = await Review.findAll({ where: { productId } });

    if (reviews.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error('Error fetching average rating:', error);
    res.status(500).json({ message: 'Error fetching average rating', error: error.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const { rating, comment } = req.body;
    await review.update({ rating, comment });

    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.destroy();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByProductId,
  getAverageRating,
  updateReview,
  deleteReview,
};
