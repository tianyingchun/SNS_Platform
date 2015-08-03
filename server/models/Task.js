var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var User = require('./Task');
var modelName = 'Task';

var attributes = {
  name: {
    type: Sequelize.STRING
  },

  description: {
    type: Sequelize.TEXT,
    validate: {
      len: [0, 1000],
    },
    allowNull: true
  },

  reward: {
    type: Sequelize.DECIMAL(2, 10),
    defaultValue: 0
  },

  // 当前任务的权重点，和Product表threshold字段关联
  // 多个任务之和>=product.threshold 就可以获得Product级别的东西或者price.
  point: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  active: {
    type: Sequelize.BOOLEAN
  },

  deleted: {
    type: Sequelize.BOOLEAN
  }
};

// merge base to each model.
_.extend(attributes, base);

var Task = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = Task;
