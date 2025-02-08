const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubscriptionPlan = sequelize.define('SubscriptionPlan', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.ENUM('weekly', 'monthly'),
    allowNull: false,
  },
  productSelection: {
    type: DataTypes.JSON,  // Stores a list of selected coffee types
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = SubscriptionPlan;
