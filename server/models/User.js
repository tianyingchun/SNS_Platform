var _ = require('lodash');
var Sequelize = require('sequelize');
var debug = require('debug')('app:UserModel');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var security = require('../services/securityService');
var SystemRoleName = require('../constants/enum/SystemRoleName');
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

    /**
     * Provider plain json object for admin role  or registered role
     * @param  {Boolean} allField true list all fields of user
     * @return {Object}  Json
     */
    toJsonValue: function (allField) {
      var result = this.get({
        plain: true
      });
      if (allField !== true) {
        var fields = ['id', 'username', 'email', 'active', 'deleted', 'isSystemAccount'];
        result = _.reduce(result, function (result, value, key) {
          if (_.includes(fields, key)) {
            result[key] = value;
          }
          return result;
        }, {});
      }
      return result;
    },
    /**
     * Check if customer belong to specific roles.
     * @param  {Array}   roles the given roles to test
     * @param  {Boolean} onlyActivedRoles: true indicates we only query actived roles.
     * @return {Promise} The then `parameter` is (user/null)
     */
    isCustomerInRoles: function (roles, onlyActivedRoles) {
      // no given roles, return true skip it.
      if (!roles) roles = [];
      if (_.isString(roles)) {
        roles = [roles];
      }
      // ignore case sensitivity
      roles = _.map(roles, function (role) {
        return role.toLowerCase();
      });

      var user = this;
      debug('instance methods: `user.isCustomerInRoles:`', roles);

      // if we need to check role whitch is actived.
      var _where = onlyActivedRoles ? {
        active: true
      } : null;

      return user.getRoles({
        where: _where
      }).then(function (_roles) {
        var matched = false;
        _.forEach(_roles, function (item) {

          // lower case
          var roleName = item.get('name').toLowerCase();

          debug('roleName:', roleName, roles);
          if (_.include(roles, roleName)) {
            matched = true;
            debug('found matched role:', roleName);
            return false;
          }
        });
        return (matched ? user : null);
      });
    },
    /**
     * Check current user if belong to sepcificed roles.
     * @param  {String}   roleSystemName   roleName 'administrators'
     * @param  {Boolean}  onlyActivedRoles
     * @return {Promise}  parameter is (user/null)
     */
    isInCustomerRole: function (roleSystemName, onlyActivedRoles) {
      onlyActivedRoles = _.isUndefined(onlyActivedRoles) ? true : !!onlyActivedRoles;
      return this.isCustomerInRoles(roleSystemName, onlyActivedRoles);
    },
    // Admin Role
    isAdmin: function (onlyActivedRoles) {
      return this.isInCustomerRole(SystemRoleName[0], onlyActivedRoles);
    },
    // Registered role.
    isRegistered: function (onlyActivedRoles) {
      return this.isInCustomerRole(SystemRoleName[1], onlyActivedRoles);
    },
    // Guest role
    isGuest: function (onlyActivedRoles) {
      return this.isInCustomerRole(SystemRoleName[2], onlyActivedRoles);
    }
  }
});

module.exports = User;
