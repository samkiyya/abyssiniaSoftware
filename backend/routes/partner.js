const express = require('express');
const multer = require('multer');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/partners');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a new partner
router.post('/', upload.single('logoUrl'), partnerController.createPartner);

// Get all partners
router.get('/', partnerController.getPartners);

// Get a partner by ID
router.get('/:id', partnerController.getPartnerById);
// Update a partner by ID
router.put('/:id', upload.single('logoUrl'), partnerController.updatePartner);


// Delete a partner by ID
router.delete('/:id', partnerController.deletePartner);

module.exports = router;
