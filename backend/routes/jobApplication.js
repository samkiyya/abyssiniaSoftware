const express = require('express');
const router = express.Router();
const multer = require('multer');
const jobApplicationController = require('../controllers/jobApplicationController');

// Multer setup for file uploads (resume)
const upload = multer({ dest: 'uploads/resumes/' });

// Create a new job application
router.post('/', upload.single('resume'), jobApplicationController.createApplication);

// Get all job applications with vacancy info
router.get('/', jobApplicationController.getAllApplications);

// Get a specific job application by ID
router.get('/:id', jobApplicationController.getApplicationById);

// Update a job application by ID
router.put('/:id', jobApplicationController.updateApplication);

// Delete a job application by ID
router.delete('/:id', jobApplicationController.deleteApplication);

module.exports = router;
