var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');

var modelName = 'Order';


var attributes = {
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  productId: {
    type: Sequelize.INTEGER,
    field: 'product_id'
  },
  // completed, initial, processing, expired, cancelled
  // emun/orderStatus.js
  status: {
    type: Sequelize.STRING
  }
};
// merge base to each model.
_.extend(attributes, base);

var Order = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = Order;
