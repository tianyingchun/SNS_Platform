var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;

var modelName = 'OrderTask';

var attributes = {

  productId: {
    type: Sequelize.INTEGER,
    field: 'product_id'
  },
  taskId: {
    type: Sequelize.INTEGER,
    field: 'task_id'
  },
  //用户完成的TASK的内容
  content: {
    type:Sequelize.TEXT
  },
  // completed, initial, processing, expired, cancelled
  status: {
    type: Sequelize.STRING
  }
};
// merge base to each model.
_.extend(attributes, base);

var OrderTask = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = OrderTask;
