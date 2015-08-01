var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./bae');
var db = require('../config').db;
var modelName = 'ProductTag';


var attributes = {
  name: {
    type: Sequelize.STRING,
    validate: {
      len: [2, 20]
    }
  }
};

// merge base to each model.
_.extend(attributes, base);

var ProductTag = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName)
});

module.exports = ProductTag;
