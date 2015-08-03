var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'ProductAttribute';

var attributes = {
  // seo purpose for productAttribute page
  name: {
    type: Sequelize.STRING
  },

  description: {
    type: Sequelize.STRING
  }
};

// merge base to each model.
_.extend(attributes, base);

var ProductAttribute = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = ProductAttribute;
