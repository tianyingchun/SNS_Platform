var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var security = require('../services/securityService');

var modelName = 'User';

var attributes = {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set: function (val) {
      // Remember to set the data value, otherwise it won't be validated
      // FIXME. we need to check if password is providered.
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
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isSystemAccount: {
    type: Sequelize.BOOLEAN,
    field: 'is_system_account',
    defaultValue: false
  },
  lastIpAddress: {
    type: Sequelize.STRING,
    field: 'last_ip_address',
    allowNull: true
  }
};
// merge base to each model.
_.extend(attributes, base);

var User = sequelize.define(modelName, attributes, {
  // timestamps: true,
  tableName: db.getTableName(modelName),

  timestamps: true,
  // Foreign keys
  // The default casing is camelCase however if the source model is configured with underscored: true
  underscored: true,

  // provider some instance method  for user model instance.
  instanceMethods: {

    isCustomerInRoles: function (roles) {
      // no given roles, return true skip it.
      if (!roles) roles = [];
      if (_.isString(roles)) {
        roles = [roles];
      }


    },
    // check current user if belong to sepcificed roles.
    isInCustomerRole: function (roleSystemName, onlyActivedRoles) {
      onlyActivedRoles = _.isUndefined(onlyActivedRoles) ? true : onlyActivedRoles;
    },
    // check current user if has admin roles
    isAdmin: function (onlyActivedRoles) {

    },
    isRegistered: function (onlyActivedRoles) {

    },
    isGuest: function (onlyActivedRoles) {

    }
  }
});

module.exports = User;
