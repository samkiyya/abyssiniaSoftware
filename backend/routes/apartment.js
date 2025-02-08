const express = require('express');
const apartmentController = require('../controllers/apartmentController');

const router = express.Router();

// Route to create a new apartment with image upload
router.post('/', apartmentController.upload.single('image'), apartmentController.createApartment);

// Route to update an apartment with image upload
router.put('/:id', apartmentController.upload.single('image'), apartmentController.updateApartment);

router.get('/', apartmentController.getAllApartments); // Get all apartments
router.get('/:id', apartmentController.getApartmentById); // Get apartment by ID

router.delete('/:id', apartmentController.deleteApartment); // Delete an apartment


module.exports = router;
