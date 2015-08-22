var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var User = require('./Task');
var modelName = 'Task';

var attributes = {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.TEXT,
    validate: {
      len: [0, 1000],
    },
  },

  reward: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false
  },

  // 当前任务的权重点，和Product表threshold字段关联
  // 多个任务之和>=product.threshold 就可以获得Product级别的东西或者price.
  point: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },

  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },

  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
};

// merge base to each model.
_.extend(attributes, base);

var Task = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true,
  defaultScope: {
    where: {
      deleted: false
    }
  }
});

module.exports = Task;
