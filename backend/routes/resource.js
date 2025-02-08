const express = require('express');
const router = express.Router();
const multer = require('multer');
const resourceController = require('../controllers/resourceController');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/resource');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
  
// Create a new resource
router.post('/', upload.single('url'), resourceController.createResource);

// Get all resources
router.get('/', resourceController.getAllResources);

// Get a resource by ID
router.get('/:id', resourceController.getResourceById);

// Update a resource by ID
router.put('/:id', upload.single('url'), resourceController.updateResource);

// Delete a resource by ID
router.delete('/:id', resourceController.deleteResource);

module.exports = router;
