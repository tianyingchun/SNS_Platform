var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base  = require('./base');
var db = require('../config').db;
var modelName = 'User';


var attributes = {
  userName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  passwordSalt: {
    type: Sequelize.STRING
  },
  adminComment: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.BOOLEAN
  },
  deleted: {
    type: Sequelize.BOOLEAN
  },
  isSystemAccount: {
    type: Sequelize.BOOLEAN
  },
  lastIpAddress: {
    type: Sequelize.STRING
  }
};
// merge base to each model.
_.extend(attributes, base);

var User = sequelize.define(modelName, attributes, {
  // timestamps: true,
  tableName: db.getTableName(modelName)
});

module.exports = User;
