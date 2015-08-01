var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'Action';

var attributes = {

};

// merge base to each model.
_.extend(attributes, base);

var Action = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName)
});

module.exports = Action;
