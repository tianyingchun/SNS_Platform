var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'UrlRecord';

var attributes = {
  // url
  slug: {
    type: Sequelize.STRING
  },
  entityId: {
    type: Sequelize.INTEGER,
    field: 'entity_id'
  },
  // Product, Category ,ProductTag...
  entityName: {
    type: Sequelize.STRING,
    field: 'entity_name'
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
};

// merge base to each model.
_.extend(attributes, base);

var UrlRecord = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName),
  underscored: true
});


module.exports = UrlRecord;
