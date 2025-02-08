const Apartment = require('../models/apartment');
const multer = require('multer');
const path = require('path');

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/apartment'); // Directory to store the uploaded images
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Add timestamp to the filename
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: File upload only supports images of type jpeg, jpg, png, or gif.');
    }
  },
});

// Create a new apartment with image upload
const createApartment = async (req, res) => {
  try {
    const { title, description, location, noRoom, features, price, availableFrom, availableTo } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/apartment/${req.file.filename}`; // Store the relative path to the image
    }

    const apartment = await Apartment.create({
      title,
      description,
      location,
      noRoom,
      features: JSON.parse(features), // Assuming features is passed as a stringified JSON
      price,
      availableFrom,
      availableTo,
      imageUrl,
    });

    res.status(201).json(apartment);
  } catch (error) {
    console.error('Error creating apartment:', error);
    res.status(500).json({ message: 'Error creating apartment', error: error.message });
  }
};

// Get all apartments
const getAllApartments = async (req, res) => {
  try {
    const baseImagePath = 'https://backend.birragroup.com/'; // Replace with your actual base image path

    const apartments = await Apartment.findAll();
    const apartmentsWithFullImagePath = apartments.map(apartment => {
      return {
        ...apartment.toJSON(), // Ensure the Sequelize instance is converted to plain object
        imageUrl: apartment.imageUrl ? `${baseImagePath}${apartment.imageUrl}` : null, // Construct full image path
      };
    });

    res.status(200).json(apartmentsWithFullImagePath);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ message: 'Error fetching apartments', error: error.message });
  }
};


// Get a single apartment by ID
const getApartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const apartment = await Apartment.findByPk(id);

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    res.status(200).json(apartment);
  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({ message: 'Error fetching apartment', error: error.message });
  }
};

// Update an apartment by ID
const updateApartment = async (req, res) => {
  const { id } = req.params;

  try {
    const apartment = await Apartment.findByPk(id);

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    const { title, description, location, noRoom, features, price, availableFrom, availableTo } = req.body;
    let imageUrl = apartment.imageUrl; // Keep the old image URL if no new image is uploaded

    if (req.file) {
      imageUrl = `/uploads/apartment/${req.file.filename}`; // If new image is uploaded, update the imageUrl
    }

    await apartment.update({
      title,
      description,
      location,
      noRoom,
      features: JSON.parse(features), // Assuming features is passed as a stringified JSON
      price,
      availableFrom,
      availableTo,
      imageUrl,
    });

    res.status(200).json({ message: 'Apartment updated successfully' });
  } catch (error) {
    console.error('Error updating apartment:', error);
    res.status(500).json({ message: 'Error updating apartment', error: error.message });
  }
};

// Delete an apartment by ID
const deleteApartment = async (req, res) => {
  const { id } = req.params;

  try {
    const apartment = await Apartment.findByPk(id);

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    await apartment.destroy();

    res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    res.status(500).json({ message: 'Error deleting apartment', error: error.message });
  }
};

// Export the controller
module.exports = {
  createApartment,
  getAllApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
  upload, // Export the upload middleware to be used in routes
};
