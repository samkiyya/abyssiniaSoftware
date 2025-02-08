const Joi = require("joi");
const Service = require("../models/service");
const path = require("path");
const fs = require("fs");
const ServiceCategory = require("../models/serviceCategory");

// Helper function to delete image
const deleteImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) console.error("Error deleting image:", err);
  });
};

// Helper function to get full image URL
const getImageUrl = (imageName) => {
  return imageName
    ? `${process.env.BASE_URL}/uploads/service/${imageName}`
    : null;
};

// Validation schemas
const serviceValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.number().required(),
  time: Joi.string().required(),
  content: Joi.string().required(),
});

const serviceUpdateValidationSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  categoryId: Joi.number().optional(),
  time: Joi.string().optional(),
  content: Joi.string().optional(),
});

// Create a new service with image upload
exports.createService = async (req, res) => {
  try {
    const { error } = serviceValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.details });
    }

    const { title, description, categoryId, time, content } = req.body;
    const image = req.file ? req.file.filename : null;

    const newService = await Service.create({
      title,
      description,
      content,
      categoryId,
      time,
      image,
    });

    res.status(201).json({
      message: "Service created successfully",
      service: {
        ...newService.toJSON(),
        image: getImageUrl(newService.image),
      },
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a service with image upload and remove old image
exports.updateService = async (req, res) => {
  try {
    const { error } = serviceUpdateValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.details });
    }

    const { title, description, categoryId, content, time } = req.body;
    const image = req.file ? req.file.filename : null;

    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Delete old image if a new one is uploaded
    if (image && service.image) {
      deleteImage(path.join(__dirname, "../uploads/service", service.image));
    }

    service.title = title || service.title;
    service.description = description || service.description;
    service.categoryId = categoryId || service.categoryId;
    service.time = time || service.time;
    service.content = content || service.content;
    if (image) service.image = image;

    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service: {
        ...service.toJSON(),
        image: getImageUrl(service.image),
      },
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a service and remove the associated image
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Delete the associated image
    if (service.image) {
      deleteImage(path.join(__dirname, "../uploads/service", service.image));
    }

    await service.destroy();

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a service by ID with full image URL
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: ServiceCategory,
          as: "category",
          attributes: ["id", "name", "description"],
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      service: {
        ...service.toJSON(),
        image: getImageUrl(service.image),
      },
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all services with full image URLs
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: ServiceCategory,
          as: "category",
          attributes: ["id", "name", "description"],
        },
      ],
    });

    res.status(200).json({
      services: services.map((service) => ({
        ...service.toJSON(),
        image: getImageUrl(service.image),
      })),
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

// Create a service category
exports.createServiceCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newCategory = await ServiceCategory.create(value);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({
      message: "Error creating service category",
      error: error.message,
    });
  }
};

// Get all service categories
exports.getAllServiceCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching service categories",
      error: error.message,
    });
  }
};

// Get a specific service category by ID
exports.getServiceCategoryById = async (req, res) => {
  try {
    const category = await ServiceCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Service category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching service category",
      error: error.message,
    });
  }
};

// Update a service category
exports.updateServiceCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const category = await ServiceCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "service category not found" });
    }

    await category.update(value);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error updating service category",
      error: error.message,
    });
  }
};

// Delete a service category
exports.deleteServiceCategory = async (req, res) => {
  try {
    const category = await ServiceCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "service category not found" });
    }

    await category.destroy();
    res.status(200).json({ message: "service category deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting service category",
      error: error.message,
    });
  }
};
