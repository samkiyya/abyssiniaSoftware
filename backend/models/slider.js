const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Slider = sequelize.define('Slider', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,  // Path to the image
    allowNull: true,
  },
});

module.exports = Slider;
