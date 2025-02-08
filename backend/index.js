require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");
const sequelize = require("./config/database");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const serviceRoutes = require("./routes/service");
const productRoutes = require("./routes/product");
const testimonyRoutes = require("./routes/tetimony");
const sliderRoutes = require("./routes/slider");
const faqRoutes = require("./routes/faq");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const apartmentRoutes = require("./routes/apartment");
const bookingRoutes = require("./routes/booking");
const aboutRoutes = require("./routes/about");
const reviewRoutes = require("./routes/review");
const galleryRoutes = require("./routes/gallery");
const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");
const resourceRoutes = require("./routes/resource");
const partnerRoutes = require("./routes/partner");
const vacancyRoutes = require("./routes/vacancy");
const jobApplicationRoutes = require("./routes/jobApplication");
const subscriptionRoutes = require("./routes/subscription");
const dashboard = require("./routes/dashboard");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");

// Set security HTTP headers
app.use(helmet());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Rate limiting to prevent DoS/DDoS attacks
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter);

// Data sanitization against XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Log HTTP requests
app.use(morgan("combined"));

// Middleware to parse JSON request bodies
app.use(express.json()); // Ensure this comes before the routes

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const swaggerFile1 = require("./apidocs/blog.json");
const swaggerFile2 = require("./apidocs/service.json");

// Endpoint to get Swagger JSON files// Merge the two Swagger JSON files
const combinedSwagger = {
  openapi: "3.0.0",
  info: {
    title: "Combined API Documentation",
    version: "1.0.0",
    description: "API documentation for both blog and service endpoints",
  },
  servers: [
    {
      url: ["http://localhost:3000/api"],
    },
    {
      url: "https://backend.abyssiniasoftware.com/api",
    },
  ],
  tags: [...swaggerFile1.tags, ...swaggerFile2.tags],
  paths: {
    ...swaggerFile1.paths,
    ...swaggerFile2.paths,
  },
  components: {
    ...swaggerFile1.components,
    ...swaggerFile2.components,
  },
};

// Endpoint to get combined Swagger JSON file
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(combinedSwagger));

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/product", productRoutes);
app.use("/api/testimony", testimonyRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/apartment", apartmentRoutes); // Apartment routes
app.use("/api/booking", bookingRoutes); // Booking routes
app.use("/api/about", aboutRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/vacancy", vacancyRoutes);
app.use("/api/job-application", jobApplicationRoutes);

app.use("/api/subscription", subscriptionRoutes);

app.use("/api/dashboard", dashboard);
// Properly isolate Swagger documentation routes

// Sync database and create tables if they don't exist
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
