const Testimony = require('../models/testimony');
const path = require('path');
const fs = require('fs');

// Create a new testimony
exports.createTestimony = async (req, res) => {
  try {
    const { description, service, company } = req.body;
    let image = null;

    if (req.file) {
      image = `uploads/testimonies/${req.file.filename}`;
    }

    const testimony = await Testimony.create({
      description,
      service,
      company,
      image
    });

    res.status(201).json({ message: 'Testimony created successfully', testimony });
  } catch (error) {
    console.error('Error creating testimony:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all testimonies
exports.getAllTestimonies = async (req, res) => {
  try {
    // Base URL from environment variables or request host
    const baseUrl = process.env.BASE_URL || `http://${req.headers.host}`;

    // Fetch all testimonies
    const testimonies = await Testimony.findAll();

    // Map testimonies to include the full image URL
    const testimoniesWithFullImageUrl = testimonies.map(testimony => ({
      ...testimony.toJSON(), // Convert Sequelize model instance to plain object
      image: testimony.image ? `${baseUrl}/${testimony.image}` : null, // Assuming 'imagePath' contains the relative path
    }));

    res.status(200).json({ testimonies: testimoniesWithFullImageUrl });
  } catch (error) {
    console.error('Error fetching testimonies:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get a single testimony by ID
exports.getTestimonyById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimony = await Testimony.findByPk(id);
    if (!testimony) {
      return res.status(404).json({ message: 'Testimony not found' });
    }
    res.status(200).json({ testimony });
  } catch (error) {
    console.error('Error fetching testimony:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a testimony by ID
exports.updateTestimony = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, service, company } = req.body;

    const testimony = await Testimony.findByPk(id);
    if (!testimony) {
      return res.status(404).json({ message: 'Testimony not found' });
    }

    if (req.file) {
      // Remove old image if it exists
      if (testimony.image) {
        fs.unlinkSync(path.join(__dirname, '../', testimony.image));
      }
      testimony.image = `uploads/testimonies/${req.file.filename}`;
    }

    testimony.description = description || testimony.description;
    testimony.service = service || testimony.service;
    testimony.company = company || testimony.company;

    await testimony.save();

    res.status(200).json({ message: 'Testimony updated successfully', testimony });
  } catch (error) {
    console.error('Error updating testimony:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a testimony by ID
exports.deleteTestimony = async (req, res) => {
  try {
    const { id } = req.params;

    const testimony = await Testimony.findByPk(id);
    if (!testimony) {
      return res.status(404).json({ message: 'Testimony not found' });
    }

    // Remove image if it exists
    if (testimony.image) {
      fs.unlinkSync(path.join(__dirname, '../', testimony.image));
    }

    await testimony.destroy();

    res.status(200).json({ message: 'Testimony deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimony:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
