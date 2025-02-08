const Product = require('../models/product');
const Category = require('../models/category');
const path = require('path');
const fs = require('fs');

// Helper function to delete image
const deleteImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) console.error('Error deleting image:', err);
  });
};

// Helper function to get full image URL
const getImageUrl = (imageName) => {
  return imageName ? `${process.env.BASE_URL}/uploads/product/${imageName}` : null;
};

// Create a new product with category association, all fields, and image upload
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,  // Ensure that price is provided
      subCategory,
      origin,
      tastingNotes,
      processingMethod,
      packagingOptions,
      stockQuantity,
      isFeatured,
      status,
      features,
      categoryId
    } = req.body;

    const image = req.file ? req.file.filename : null;
console.log(req.body);
    // Check if category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Create a new product with all the necessary fields
    const newProduct = await Product.create({
      title,
      description,
      price,  // Use price from the request body
      subCategory,  // Add subCategory field
      origin,  // Add origin field
      tastingNotes,  // Add tastingNotes field
      processingMethod,  // Add processingMethod field
      packagingOptions,  // Add packagingOptions field (could be an object or JSON)
      stockQuantity,  // Add stockQuantity field
      isFeatured,  // Add isFeatured field
      status,  // Add status field
      features,  // Add features field (could be JSON)
      image,
      categoryId,  // Category ID for association
    });

    res.status(201).json({
      message: 'Product created successfully',
      product: {
        ...newProduct.toJSON(),
        image: getImageUrl(newProduct.image),
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params; // Extract categoryId from the route parameter

  try {
    // Find products associated with the given category ID
    const products = await Product.findAll({
      where: { categoryId },
      include: [
        {
          model: Category,
          as: 'category', // Alias defined in the model association
          attributes: ['id', 'name'], // Select only the needed fields
        },
      ],
    });

    // If no products are found, return an appropriate response
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found for this category',
      });
    }

    // Return the products
    res.status(200).json({
      products: products.map((product) => ({
        ...product.toJSON(),
        image: getImageUrl(product.image),
      })),
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching products',
      error: error.message,
    });
  }
};
// Get all products with their categories and full image URLs
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'], // Fetch only necessary fields from Category
      },
    });
    res.status(200).json({
      products: products.map((product) => ({
        ...product.toJSON(),
        image: getImageUrl(product.image),
      })),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single product by ID with category and full image URL
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      product: {
        ...product.toJSON(),
        image: getImageUrl(product.image),
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a product with category association, image upload, and remove old image

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      subCategory,
      origin,
      tastingNotes,
      processingMethod,
      packagingOptions,
      stockQuantity,
      isFeatured,
      status,
      features,
      categoryId
    } = req.body;

    const image = req.file ? req.file.filename : null;

    // Find the product by ID
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if category exists before assigning
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      product.categoryId = categoryId;
    }

    // Delete old image if a new one is uploaded
    if (image && product.image) {
      try {
        deleteImage(path.join(__dirname, '../uploads/product', product.image));
      } catch (err) {
        console.error('Error deleting old image:', err);
        return res.status(500).json({ message: 'Error deleting old image' });
      }
    }

    // Update fields with new values or retain old ones if not provided
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.subCategory = subCategory || product.subCategory;
    product.origin = origin || product.origin;
    product.tastingNotes = tastingNotes || product.tastingNotes;
    product.processingMethod = processingMethod || product.processingMethod;
    product.packagingOptions = packagingOptions || product.packagingOptions;
    product.stockQuantity = stockQuantity || product.stockQuantity;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.status = status || product.status;
    product.features = features || product.features;

    // Update the image if a new one is provided
    if (image) product.image = image;

    // Save the updated product
    await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product: {
        ...product.toJSON(),
        image: getImageUrl(product.image), // Assuming you have a method to get image URL
      },
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a product and remove the associated image
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the associated image
    if (product.image) {
      deleteImage(path.join(__dirname, '../uploads/product', product.image));
    }

    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
