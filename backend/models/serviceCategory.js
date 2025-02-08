const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path to your DB configuration

const ServiceCategory = sequelize.define("ServiceCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = ServiceCategory;
