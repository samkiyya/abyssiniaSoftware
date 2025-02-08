// controllers/categoryController.js

const Category = require('../models/category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name,type, description } = req.body;

    const newCategory = await Category.create({
      name,
      type,
      description,
    });

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type,description } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;
    category.type = type || category.type;
    category.description = description || category.description;

    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
