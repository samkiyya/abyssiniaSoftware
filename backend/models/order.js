// models/order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Import User model
const Product = require('./product'); // Import Product model

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'shipped', 'delivered'),
    defaultValue: 'pending',
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
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

// Define associations
Order.belongsTo(User, { foreignKey: 'userId' });  // One Order belongs to one User
Order.belongsTo(Product, { foreignKey: 'productId' });  // One Order belongs to one Product

module.exports = Order;
