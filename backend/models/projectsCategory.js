const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path to your DB configuration

const ProjectCategory = sequelize.define("ProjectCategory", {
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

module.exports = ProjectCategory;
