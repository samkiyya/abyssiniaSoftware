// routes/productRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const router = express.Router();

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/product'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/by-category/:categoryId', productController.getProductsByCategoryId);
module.exports = router;
