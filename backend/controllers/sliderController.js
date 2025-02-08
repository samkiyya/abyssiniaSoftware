const Slider = require('../models/slider');
const path = require('path');
const fs = require('fs');

// Create a new slider
exports.createSlider = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;

    if (req.file) {
      image = `uploads/sliders/${req.file.filename}`;
    }

    const slider = await Slider.create({
      title,
      description,
      image
    });

    res.status(201).json({ message: 'Slider created successfully', slider });
  } catch (error) {
    console.error('Error creating slider:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all sliders
exports.getAllSliders = async (req, res) => {
  try {
    // Base URL from environment variables or request host
    const baseUrl = process.env.BASE_URL;

    // Fetch all sliders
    const sliders = await Slider.findAll();

    // Map sliders to include the full image URL
    const slidersWithFullImageUrl = sliders.map(slider => ({
      ...slider.toJSON(), // Convert Sequelize model instance to plain object
      image: slider.image ? `${baseUrl}/${slider.image}` : null, // Assuming 'imagePath' contains the relative image path
    }));

    res.status(200).json({ sliders: slidersWithFullImageUrl });
  } catch (error) {
    console.error('Error fetching sliders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get a single slider by ID
exports.getSliderById = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findByPk(id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    res.status(200).json({ slider });
  } catch (error) {
    console.error('Error fetching slider:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a slider by ID
exports.updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const slider = await Slider.findByPk(id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }

    if (req.file) {
      // Remove old image if it exists
      if (slider.image) {
        fs.unlinkSync(path.join(__dirname, '../', slider.image));
      }
      slider.image = `uploads/sliders/${req.file.filename}`;
    }

    slider.title = title || slider.title;
    slider.description = description || slider.description;

    await slider.save();

    res.status(200).json({ message: 'Slider updated successfully', slider });
  } catch (error) {
    console.error('Error updating slider:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a slider by ID
exports.deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;

    const slider = await Slider.findByPk(id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }

    // Remove image if it exists
    if (slider.image) {
      fs.unlinkSync(path.join(__dirname, '../', slider.image));
    }

    await slider.destroy();

    res.status(200).json({ message: 'Slider deleted successfully' });
  } catch (error) {
    console.error('Error deleting slider:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
