var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var config = require('../config');
var db = config.db;
var security = require('../services/securityService');

var modelName = 'User';


var attributes = {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
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
    defaultValue: security.getDefaultSalt(),
    allowNull: true,
    set: function (val) {
      // FIXME do nothing, don't need manully update password salt.
    }
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
  tableName: db.getTableName(modelName),

  getterMethods: {
    // define virtual attribute,are not actually part of your database schema
    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    }
  },
  setterMethods: {
    fullName: function (val) {
      // Note. the virtual setter method have no validate() method.
      var names = (val || "").split(' ');
      this.setDataValue('firstName', names[0] || "");
      this.setDataValue('lastName', names[1]) || "";
    }
  }
});

module.exports = User;
