var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'Privilege';

var attributes = {
  userId: {
    type: Sequelize.UUID(),
    field: 'user_id'
  },
  roleId: {
    type: Sequelize.UUID(),
    field: 'role_id'
  },
  privilegeTarget: {
    type: Sequelize.ENUM,
    field: 'privilege_target',
    // maybe we should define some role operation type.
    // Application, menus, buttons.
    values: ['Application']
  },
  // this filed used to store current privilege settings.
  // it should be json string.
  privilegeValue: {
    type: Sequelize.STRING,
    field: 'privilege_value'
  },
  // current privilige status true ==> enabled.
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
};

// merge base to each model.
_.extend(attributes, base);

var Privilege = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = Privilege;
