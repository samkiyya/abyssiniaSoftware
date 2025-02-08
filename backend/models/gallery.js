const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category =require('./category');
// Define the Gallery model
const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },

 
});
Gallery.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Gallery, { foreignKey: 'categoryId', as: 'gallary' });
// Export the model for use in other parts of the app
module.exports = Gallery;
