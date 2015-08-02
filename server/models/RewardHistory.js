var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'RewardHistory';

var attributes = {
  userId: {
    type: Sequelize.UUID()
  },
  points: {
    type: Sequelize.NUMBER
  },
  pointsBalance: {
    type: Sequelize.NUMBER
  },
  usedAmount: {
    type: Sequelize.DECIMAL(10, 2)
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
  tableName: db.getTableName(modelName)
});

module.exports = RewardHistory;
