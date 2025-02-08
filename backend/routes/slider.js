const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createSlider, getAllSliders, getSliderById, updateSlider, deleteSlider } = require('../controllers/sliderController');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/sliders');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('image'), createSlider);
router.get('/', getAllSliders);
router.get('/:id', getSliderById);
router.put('/:id', upload.single('image'), updateSlider);
router.delete('/:id', deleteSlider);

module.exports = router;
