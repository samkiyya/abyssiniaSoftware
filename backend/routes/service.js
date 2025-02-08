// routes/serviceRoutes.js

const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const upload = require("../middleware/upload");

// CRUD routes for services
router.post("/", upload.single("image"), serviceController.createService);
router.get("/", serviceController.getAllServices);

// create service category
router.post("/category", serviceController.createServiceCategory);
// get all service categories
router.get("/category", serviceController.getAllServiceCategories);

// get specific service category
router.get("/category/:id", serviceController.getServiceCategoryById);

// update service category
router.put("/category/:id", serviceController.updateServiceCategory);

// delete service category
router.delete("/category/:id", serviceController.deleteServiceCategory);

router.get("/:id", serviceController.getServiceById);
router.patch("/:id", upload.single("image"), serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;
