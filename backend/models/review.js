// models/review.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./product"); // Importing the Product model

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER, // Rating from 1 to 5
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Product,
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Relationships
Review.belongsTo(Product, { foreignKey: "productId", onDelete: "SET NULL" });

module.exports = Review;
