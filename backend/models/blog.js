// models/Blog.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BlogCategory = require("./blogCategory");

const Blog = sequelize.define("Blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: BlogCategory,
      key: "id",
    },
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // Make it optional
  },
});

Blog.belongsTo(BlogCategory, {
  as: "category",
  foreignKey: "categoryId",
  onDelete: "CASCADE", // Cascade delete
});

module.exports = Blog;
