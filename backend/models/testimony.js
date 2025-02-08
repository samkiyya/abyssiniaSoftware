const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimony = sequelize.define('Testimony', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,  // Path to the image
    allowNull: true,
  },
});

module.exports = Testimony;
