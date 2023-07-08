const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');

dotenv.config({ path: './config.env' })

const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PRT,
  database: process.env.DB,
  logging: false
});

module.exports = { db, DataTypes };
