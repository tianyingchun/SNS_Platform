var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'Privilege';

var attributes = {
  userId: {
    type: Sequelize.UUID()
  },
  roleId: {
    type: Sequelize.UUID()
  },
  privilegeTarget: {
    type: Sequelize.ENUM,
    // maybe we should define some role operation type.
    // Application, menus, buttons.
    values: []
  },
  // this filed used to store current privilege settings.
  // it should be json string.
  privilegeValue: {
    type: Sequelize.STRING
  },
  // current privilige status true ==> enabled.
  activated: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
};

// merge base to each model.
_.extend(attributes, base);

var Privilege = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName)
});

module.exports = Privilege;
