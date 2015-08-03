var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var config = require('../config');
var db = config.db;
var security = require('../services/securityService');

var modelName = 'User';

var attributes = {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    set: function (val) {
      // Remember to set the data value, otherwise it won't be validated
      var salt = security.getRandomSalt();
      var password = security.getEncryptedPassword(val, salt);
      this.setDataValue('password', password);
      this.setDataValue('passwordSalt', salt);
    }
  },
  passwordSalt: {
    type: Sequelize.STRING,
    field: 'password_salt',
    allowNull: true
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
  tableName: db.getTableName(modelName),

  // Foreign keys
  // The default casing is camelCase however if the source model is configured with underscored: true
  underscored: true,
});

module.exports = User;
