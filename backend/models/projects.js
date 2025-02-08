// models/project.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path to your DB configuration
const ProjectCategory = require("./projectsCategory");

const Project = sequelize.define("Project", {
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
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: ProjectCategory,
      key: "id",
    },
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "ongoing",
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
});

Project.belongsTo(ProjectCategory, {
  as: "category",
  foreignKey: "categoryId",
  onDelete: "CASCADE", // Cascade delete
});

module.exports = Project;
