var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'ProductTag';


var attributes = {
  name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      len: [2, 50]
    }
  }
};

// merge base to each model.
_.extend(attributes, base);

var ProductTag = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = ProductTag;
