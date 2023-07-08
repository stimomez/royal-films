const { db, DataTypes } = require('../utils/dataBase.util');

// Create our first model (table)
const Film = db.define('film', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  classificationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  trailerUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  filmDirector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reparto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = { Film };
