var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'ProductAttributeValue';

var attributes = {
  // seo purpose for productAttributeValue page
  name: {
    type: Sequelize.STRING
  }
};

// merge base to each model.
_.extend(attributes, base);

var ProductAttributeValue = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = ProductAttributeValue;
