const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vancncyController');

// Create a new vacancy
router.post('/', vacancyController.createVacancy);

// Get all vacancies
router.get('/', vacancyController.getAllVacancies);

// Get a specific vacancy by ID
router.get('/:id', vacancyController.getVacancyById);

// Update a vacancy by ID
router.put('/:id', vacancyController.updateVacancy);

// Delete a vacancy by ID
router.delete('/:id', vacancyController.deleteVacancy);

module.exports = router;
