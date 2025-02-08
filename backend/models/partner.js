const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path if necessary

const Partner = sequelize.define('Partner', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  partnershipType: {
    type: DataTypes.STRING,
    allowNull: true,
    
  },
});

module.exports = Partner;
