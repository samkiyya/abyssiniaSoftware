const { Sequelize } = require("sequelize");

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    port: 3306,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Disable logging; default: console.log
  }
);

module.exports = sequelize;
