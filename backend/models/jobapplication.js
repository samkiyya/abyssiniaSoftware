const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vacancy = require('./vacancy');

const JobApplication = sequelize.define('JobApplication', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING, // Path to uploaded file
    allowNull: false,
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Reviewed', 'Rejected', 'Accepted'),
    defaultValue: 'Pending',
  },
});

// Relationship: JobApplication belongs to a Vacancy
JobApplication.belongsTo(Vacancy, {
  foreignKey: 'vacancyId',
  onDelete: 'CASCADE',
});

module.exports = JobApplication;
