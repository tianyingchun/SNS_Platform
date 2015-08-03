var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var User = require('./Task');
var modelName = 'Task';

var attributes = {

};

// merge base to each model.
_.extend(attributes, base);

var Task = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});

//Will add user_id to Task, use {underscored: true}
Task.belongsTo(User);

module.exports = Task;
