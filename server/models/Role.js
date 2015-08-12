var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var User = require('./User');
var modelName = 'Role';

var attributes = {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isSystemRole: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    field: 'is_system_role'
  },
  systemName: {
    type: Sequelize.STRING,
    allowNull: false,
    filed: 'system_name'
  }
};

// merge base to each model.
_.extend(attributes, base);

var Role = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = Role;
