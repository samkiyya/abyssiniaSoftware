// models/aboutCompany.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AboutCompany = sequelize.define('AboutCompany', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  visionStatement: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  visionMotto: {
    type: DataTypes.STRING,  // New field for the vision motto
    allowNull: true,         // Optional field
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  socialMediaLinks: {
    type: DataTypes.JSON,
    allowNull: true,
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

// Export the model for use
module.exports = AboutCompany;
