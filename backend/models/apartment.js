const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Apartment = sequelize.define('Apartment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noRoom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  availableFrom: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  availableTo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
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



module.exports = Apartment;
