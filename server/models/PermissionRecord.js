var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'PermissionRecord';

var attributes = {

};

// merge base to each model.
_.extend(attributes, base);

var PermissionRecord = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName)
});

module.exports = PermissionRecord;
