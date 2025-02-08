const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path to your database configuration

const Resource = sequelize.define('Resource', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('video', 'pdf', 'audio'),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Resource;
