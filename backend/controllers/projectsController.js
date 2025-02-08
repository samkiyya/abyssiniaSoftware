// controllers/projectController.js
const Joi = require("joi");
const Project = require("../models/projects");
const ProjectCategory = require("../models/projectsCategory");
const path = require("path");
const fs = require("fs");

const getImageUrl = (imageName) => {
  return imageName ? `${process.env.BASE_URL}${imageName}` : null;
};

// Validation schemas
const projectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  status: Joi.string().optional(),
  categoryId: Joi.number().optional(),
  content: Joi.string().optional(),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const imageUrl = req.file ? `/uploads/projects/${req.file.filename}` : null;
    const newProject = await Project.create({
      ...value,
      imageUrl,
    });

    res.status(201).json({
      ...newProject.toJSON(),
      imageUrl: getImageUrl(newProject.imageUrl),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: {
        model: ProjectCategory,
        as: "category",
        attributes: ["name", "description", "id"],
      },
    });

    const projectsWithFullImageUrl = projects.map((project) => ({
      ...project.toJSON(),
      imageUrl: getImageUrl(project.imageUrl),
    }));

    res.status(200).json(projectsWithFullImageUrl);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id },
      include: {
        model: ProjectCategory,
        as: "category",
        attributes: ["name", "description", "id"],
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      ...project.toJSON(),
      imageUrl: getImageUrl(project.imageUrl),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching project", error: error.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.update(value);
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
  }
};

// Create a project category
exports.createProjectCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newCategory = await ProjectCategory.create(value);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({
      message: "Error creating project category",
      error: error.message,
    });
  }
};

// Get all project categories
exports.getAllProjectCategories = async (req, res) => {
  try {
    const categories = await ProjectCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching project categories",
      error: error.message,
    });
  }
};

// Get a specific project category by ID
exports.getProjectCategoryById = async (req, res) => {
  try {
    const category = await ProjectCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Project category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching project category",
      error: error.message,
    });
  }
};

// Update a project category
exports.updateProjectCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const category = await ProjectCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Project category not found" });
    }

    await category.update(value);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error updating project category",
      error: error.message,
    });
  }
};

// Delete a project category
exports.deleteProjectCategory = async (req, res) => {
  try {
    const category = await ProjectCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Project category not found" });
    }

    await category.destroy();
    res.status(200).json({ message: "Project category deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting project category",
      error: error.message,
    });
  }
};
