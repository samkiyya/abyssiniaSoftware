const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust this path if needed

const Vacancy = sequelize.define('Vacancy', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employmentType: {
    type: DataTypes.ENUM('Full-Time', 'Part-Time', 'Contract', 'Internship'),
    allowNull: false,
  },
  salaryRange: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Open', 'Closed'),
    defaultValue: 'Open',
  },
});

module.exports = Vacancy;
