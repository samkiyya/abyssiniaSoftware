// models/Category.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Category;
