const  Gallery = require('../models/gallery'); // Ensure correct import
const upload = require('../middleware/uploadGallery');
const  Category = require('../models/category');
exports.createGalleryItem = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { title,categoryId } = req.body;
      const imageUrl = req.file ? `/uploads/gallery/${req.file.filename}` : null;

      if (!title || !imageUrl) {
        return res.status(400).json({ message: 'Title and image are required' });
      }

      const newGalleryItem = await Gallery.create({
        title,
        imageUrl,
        categoryId
      });

      res.status(201).json(newGalleryItem);
    } catch (error) {
      res.status(500).json({ message: 'Error creating gallery item', error: error.message });
    }
  });
};

// Get all gallery items
exports.getAllGalleries = async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL || `http://${req.headers.host}`;

    const galleries = await Gallery.findAll({
      include: [
        {
          model: Category,
          as: 'category', // Alias defined in the model association
          attributes: ['id', 'name'], // Include only the fields you need
        },
      ],
    });

    if (galleries.length === 0) {
      return res.status(404).json({ success: false, message: 'No galleries found' });
    }

    // Add full image URL to each gallery
    const galleriesWithFullImageUrl = galleries.map(gallery => ({
      ...gallery.toJSON(), // Convert Sequelize model instance to plain object
      imageUrl: `${baseUrl}${gallery.imageUrl}`, // Assuming 'imagePath' contains the relative path
    }));

    res.status(200).json({ success: true, galleries: galleriesWithFullImageUrl });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    res.status(500).json({ success: false, message: 'Error fetching galleries', error: error.message });
  }
};


// Get galleries by categoryId
exports.getGalleriesByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const galleries = await Gallery.findAll({
      where: { categoryId },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'], // Include only the fields you need
        },
      ],
    });

    if (galleries.length === 0) {
      return res.status(404).json({ success: false, message: 'No galleries found for this category' });
    }

    res.status(200).json({ success: true, galleries });
  } catch (error) {
    console.error('Error fetching galleries by category:', error);
    res.status(500).json({ success: false, message: 'Error fetching galleries by category', error: error.message });
  }
};

// Get a specific gallery item by ID
exports.getGalleryItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const galleryItem = await Gallery.findByPk(id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    return res.status(200).json(galleryItem);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching gallery item', error: error.message });
  }
};

// Update an existing gallery item
exports.updateGalleryItem = async (req, res) => {
  const { id } = req.params;
  const { title, imageUrl } = req.body;
  
  try {
    const galleryItem = await Gallery.findByPk(id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    galleryItem.title = title || galleryItem.title;
    galleryItem.imageUrl = imageUrl || galleryItem.imageUrl;
    await galleryItem.save();

    return res.status(200).json(galleryItem);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating gallery item', error: error.message });
  }
};

// Delete a gallery item
exports.deleteGalleryItem = async (req, res) => {
  const { id } = req.params;
  
  try {
    const galleryItem = await Gallery.findByPk(id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    await galleryItem.destroy();
    return res.status(204).json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting gallery item', error: error.message });
  }
};
