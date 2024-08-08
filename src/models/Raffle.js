const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Raffle = sequelize.define('Raffle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  draw_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'Raffles'
});

module.exports = Raffle;
