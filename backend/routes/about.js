// routes/aboutCompanyRoutes.js
const express = require('express');
const router = express.Router();
const aboutCompanyController = require('../controllers/aboutController');

// Create a new AboutCompany
router.post('/', aboutCompanyController.createAboutCompany);

// Get all AboutCompany records
router.get('/', aboutCompanyController.getAllCompanies);

// Get a single AboutCompany by ID
router.get('/:id', aboutCompanyController.getCompanyById);

// Update an AboutCompany record by ID
router.put('/:id', aboutCompanyController.updateCompany);

// Delete an AboutCompany record by ID
router.delete('/:id', aboutCompanyController.deleteCompany);

module.exports = router;
