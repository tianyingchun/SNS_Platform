var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'SpecificationAttributeOption';

var attributes = {
  // seo purpose for productAttribute page
  name: {
    type: Sequelize.STRING
  },

  displayOrder: {
    type: Sequelize.INTEGER,
    field: 'display_order'
  }
};

// merge base to each model.
_.extend(attributes, base);

var SpecificationAttributeOption = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = SpecificationAttributeOption;
