// models/Service.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path to your database configuration
const ServiceCategory = require("./serviceCategory");

const Service = sequelize.define("Service", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: ServiceCategory,
      key: "id",
    },
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING, // You can change this to INTEGER or DATE depending on your needs
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Assuming you store image URLs or file paths as strings
    allowNull: true,
  },
});

Service.belongsTo(ServiceCategory, {
  as: "category",
  foreignKey: "categoryId",
  onDelete: "CASCADE", // Cascade delete
});

module.exports = Service;
