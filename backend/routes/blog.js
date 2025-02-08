// routes/blogRoutes.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const blogController = require("../controllers/blogController");

const router = express.Router();

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/blog"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), blogController.createBlog);
router.get("/", blogController.getAllBlogs);
// create blog category
router.post("/category", blogController.createBlogCategory);
// get all blog categories
router.get("/category", blogController.getAllBlogCategories);

// get specific blog category
router.get("/category/:id", blogController.getBlogCategoryById);

// update blog category
router.put("/category/:id", blogController.updateBlogCategory);

// delete blog category
router.delete("/category/:id", blogController.deleteBlogategory);

router.get("/:id", blogController.getBlogById);
router.put("/:id", upload.single("image"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
