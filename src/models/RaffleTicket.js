const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Raffle = require('./Raffle');

const RaffleTicket = sequelize.define('RaffleTicket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'available',
  },
}, {
  timestamps: true,
});

RaffleTicket.belongsTo(User);
RaffleTicket.belongsTo(Raffle);

module.exports = RaffleTicket;
