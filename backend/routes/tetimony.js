const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createTestimony, getAllTestimonies, getTestimonyById, updateTestimony, deleteTestimony } = require('../controllers/testimoneyController');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/testimonies');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('image'), createTestimony);
router.get('/', getAllTestimonies);
router.get('/:id', getTestimonyById);
router.put('/:id', upload.single('image'), updateTestimony);
router.delete('/:id', deleteTestimony);

module.exports = router;
