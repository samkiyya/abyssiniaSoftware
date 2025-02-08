const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Create a new gallery item
router.post('/', galleryController.createGalleryItem);

// Get all gallery items
router.get('/', galleryController.getAllGalleries);
router.get('/category/:categoryId', galleryController.getGalleriesByCategoryId);
// Get a specific gallery item by ID
router.get('/:id', galleryController.getGalleryItemById);

// Update a gallery item by ID
router.put('/:id', galleryController.updateGalleryItem);

// Delete a gallery item by ID
router.delete('/:id', galleryController.deleteGalleryItem);

module.exports = router;
