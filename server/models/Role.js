var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'Role';

var attributes = {

};

// merge base to each model.
_.extend(attributes, base);

var Role = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName)
});

module.exports = Role;
