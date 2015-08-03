var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'Role';

var attributes = {
  name: {
    type: Sequelize.STRING,
    unique: true
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
    allowNull: true,
    filed: 'system_name'
  }
};

// merge base to each model.
_.extend(attributes, base);

var Role = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName)
});

module.exports = Role;
