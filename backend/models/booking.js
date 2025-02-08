const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Import User model
const Apartment = require('./apartment'); // Import Apartment model

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,  // Reference to the User model
      key: 'id',
    },
    allowNull: false,
  },
  apartmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Apartment,  // Reference to the Apartment model
      key: 'id',
    },
    allowNull: false,
  },
  bookingDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
    defaultValue: 'pending',
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
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Apartment, { foreignKey: 'apartmentId' });

module.exports = Booking;
