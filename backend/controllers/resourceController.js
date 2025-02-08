const Resource = require('../models/resource');
const path = require('path');

// Create a new resource
exports.createResource = async (req, res) => {
  try {
    const { title, type, description } = req.body;
    const fileUrl = `/uploads/resources/${req.file.filename}`;

    const newResource = await Resource.create({
      title,
      type,
      url: fileUrl,
      description,
    });

    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error: error.message });
  }
};

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    // Base URL from environment variables or request host
    const baseUrl = process.env.BASE_URL || `http://${req.headers.host}`;

    // Fetch all resources
    const resources = await Resource.findAll();

    // Map resources to include the full image URL
    const resourcesWithFullImageUrl = resources.map(resource => ({
      ...resource.toJSON(), // Convert Sequelize model instance to plain object
      url: resource.url ? `${baseUrl}${resource.url}` : null, // Assuming 'imagePath' contains the relative image path
    }));

    res.status(200).json(resourcesWithFullImageUrl);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ message: 'Error fetching resources', error: error.message });
  }
};


// Get a resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource', error: error.message });
  }
};

// Update a resource by ID
exports.updateResource = async (req, res) => {
  try {
    const { title, type, description } = req.body;

    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const updatedData = {
      title: title || resource.title,
      type: type || resource.type,
      description: description || resource.description,
    };

    if (req.file) {
      updatedData.url = `/uploads/resources/${req.file.filename}`;
    }

    const updatedResource = await resource.update(updatedData);
    res.status(200).json({ message: 'Resource updated successfully', resource: updatedResource });
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error: error.message });
  }
};

// Delete a resource by ID
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.destroy();
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error: error.message });
  }
};
