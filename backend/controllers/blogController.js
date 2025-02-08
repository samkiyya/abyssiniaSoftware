const Joi = require("joi");
const Blog = require("../models/blog");
const path = require("path");
const fs = require("fs");
const BlogCategory = require("../models/blogCategory");

// Helper function to delete image
const deleteImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) console.error("Error deleting image:", err);
  });
};

// Helper function to get full image URL
const getImageUrl = (imageName) => {
  return imageName ? `${process.env.BASE_URL}/uploads/blog/${imageName}` : null;
};

// Validation schemas
const blogValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  content: Joi.string().required(),
  date: Joi.date().required(),
  categoryId: Joi.number().required(),
});

const blogUpdateValidationSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  content: Joi.string().optional(),
  date: Joi.date().optional(),
  categoryId: Joi.number().optional(),
});

// Create a new blog with image upload
exports.createBlog = async (req, res) => {
  try {
    const { error } = blogValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.details });
    }

    const { title, description, content, date, categoryId } = req.body;
    const image = req.file ? req.file.filename : null;

    const newBlog = await Blog.create({
      title,
      description,
      content,
      date,
      categoryId,
      image,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: {
        ...newBlog.toJSON(),
        image: getImageUrl(newBlog.image),
      },
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a blog with image upload and remove old image
exports.updateBlog = async (req, res) => {
  try {
    const { error } = blogUpdateValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.details });
    }

    const { id } = req.params;
    const { title, description, content, date, categoryId } = req.body;
    const image = req.file ? req.file.filename : null;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete old image if a new one is uploaded
    if (image && blog.image) {
      deleteImage(path.join(__dirname, "../uploads/blog", blog.image));
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.date = date || blog.date;
    blog.categoryId = categoryId || blog.categoryId;
    blog.content = content || blog.content;
    if (image) blog.image = image;

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog: {
        ...blog.toJSON(),
        image: getImageUrl(blog.image),
      },
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a blog and remove the associated image
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the associated image
    if (blog.image) {
      deleteImage(path.join(__dirname, "../uploads/blog", blog.image));
    }

    await blog.destroy();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single blog by ID with full image URL
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({
      where: { id },
      include: [
        {
          model: BlogCategory,
          as: "category",
          attributes: ["id", "name", "description"],
        },
      ],
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      blog: {
        ...blog.toJSON(),
        image: getImageUrl(blog.image),
      },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all blogs with full image URLs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: BlogCategory,
          as: "category",
          attributes: ["id", "name", "description"],
        },
      ],
    });
    res.status(200).json({
      blogs: blogs.map((blog) => ({
        ...blog.toJSON(),
        image: getImageUrl(blog.image),
      })),
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.optional(),
});

// Create a blog category
exports.createBlogCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newCategory = await BlogCategory.create(value);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({
      message: "Error creating Blog category",
      error: error.message,
    });
  }
};

// Get all blog categories
exports.getAllBlogCategories = async (req, res) => {
  try {
    const categories = await BlogCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching blog categories",
      error: error.message,
    });
  }
};

// Get a specific blog category by ID
exports.getBlogCategoryById = async (req, res) => {
  try {
    const category = await BlogCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Blog category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching blog category",
      error: error.message,
    });
  }
};

// Update a blog category
exports.updateBlogCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const category = await BlogCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Blog category not found" });
    }

    await category.update(value);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error updating Blog category",
      error: error.message,
    });
  }
};

// Delete a Blog category
exports.deleteBlogategory = async (req, res) => {
  try {
    const category = await BlogCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Blog category not found" });
    }

    await category.destroy();
    res.status(200).json({ message: "Blog category deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting Blo category",
      error: error.message,
    });
  }
};
