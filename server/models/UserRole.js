var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'UserRole';

var attributes = {

};

// merge base to each model.
_.extend(attributes, base);

var UserRole = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName)
});

module.exports = UserRole;
