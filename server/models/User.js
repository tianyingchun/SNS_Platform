var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base  = require('./base');
var db = require('../config').db;
var modelName = 'User';


var attributes = {
  userName: {
    type: Sequelize.STRING,
    field: 'user_name'
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  passwordSalt: {
    type: Sequelize.STRING,
    field: 'password_salt'
  },
  adminComment: {
    type: Sequelize.STRING,
    field: 'admin_comment'
  },
  active: {
    type: Sequelize.BOOLEAN
  },
  deleted: {
    type: Sequelize.BOOLEAN
  },
  isSystemAccount: {
    type: Sequelize.BOOLEAN,
    field: 'is_system_account'
  },
  lastIpAddress: {
    type: Sequelize.STRING,
    field: 'last_ip_address'
  }
};
// merge base to each model.
_.extend(attributes, base);

var User = sequelize.define(modelName, attributes, {
  // timestamps: true,
  tableName: db.getTableName(modelName)
});

module.exports = User;
