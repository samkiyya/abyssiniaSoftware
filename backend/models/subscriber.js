const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const SubscriptionPlan = require('./subscriptionPlan');

const Subscriber = sequelize.define('Subscriber', {
  fullName: {
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
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'paused', 'cancelled'),
    defaultValue: 'active',
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Relationship: Subscriber belongs to a SubscriptionPlan
Subscriber.belongsTo(SubscriptionPlan, {
  foreignKey: 'subscriptionPlanId',
  onDelete: 'SET NULL',
});

module.exports = Subscriber;
