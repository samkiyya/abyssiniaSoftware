// routes/projectRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const projectController = require("../controllers/projectsController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/projects");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // Add timestamp to filenames
    const sanitizedFileName = file.originalname.replace(/\s+/g, "_"); // Remove spaces
    cb(null, file.originalname);
  },
});

// Multer configuration
const upload = multer({
  storage,
});

// Create a new project
router.post("/", upload.single("image"), projectController.createProject);

// Get all projects
router.get("/", projectController.getAllProjects);
// create project category
router.post("/category", projectController.createProjectCategory);
// get all project categories
router.get("/category", projectController.getAllProjectCategories);

// get specific project category
router.get("/category/:id", projectController.getProjectCategoryById);

// update project category
router.put("/category/:id", projectController.updateProjectCategory);

// delete project category
router.delete("/category/:id", projectController.deleteProjectCategory);

// Get a specific project by ID
router.get("/:id", projectController.getProjectById);

// Update a project
router.put("/:id", projectController.updateProject);

// Delete a project
router.delete("/:id", projectController.deleteProject);

module.exports = router;
