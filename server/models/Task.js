var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'Task';

var attributes = {

};

// merge base to each model.
_.extend(attributes, base);

var Task = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName)
});

module.exports = Task;
