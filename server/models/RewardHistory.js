var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'RewardHistory';

var attributes = {
  userId: {
    type: Sequelize.UUID(),
    field: 'user_id'
  },
  points: {
    type: Sequelize.INTEGER
  },
  pointsBalance: {
    type: Sequelize.INTEGER,
    field: 'points_balance',
  },
  usedAmount: {
    type: Sequelize.DECIMAL(10, 2),
    field: 'used_amount'
  },
  message: {
    type: Sequelize.STRING,
    allowNull: true
  }
};

// merge base to each model.
_.extend(attributes, base);

var RewardHistory = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = RewardHistory;
