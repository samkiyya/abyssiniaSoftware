// models/Product.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category'); // Import the Category model

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subCategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tastingNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  processingMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  packagingOptions: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Available',
  },
});

// Establish the relationship between Product and Category
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

module.exports = Product;
