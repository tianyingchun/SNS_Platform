var _ = require('lodash');
var q = require('q');
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
     * @param  {Array<Number>}   roles the given roles to test,it's number type
     *                   Note. we can use [SystemRoleName.Administrator] ==>0
     *                   can't use SystemRoleName[0] to match roles.
     * @param  {Boolean} onlyActivedRoles: true indicates we only query actived roles.
     * @return {Promise} The then `parameter` is (user/null)
     */
    isCustomerInRoles: function (roles, onlyActivedRoles) {

      // default ignore no-actived role.
      onlyActivedRoles = _.isUndefined(onlyActivedRoles) ? false : onlyActivedRoles;
      // no given roles, return true skip it.
      if (_.isUndefined(roles)) {
        roles = [];
      }
      if (!_.isArray(roles)) {
        roles = [roles];
      }
      var user = this;

      debug('instance methods: `user.isCustomerInRoles:`', roles);

      function isRoleMatched(userRoles) {
        var matched = false;
        _.forEach(userRoles, function (item) {
          // role system name it's number type, mapping to 'constants/enum/SystemRoleName'
          var roleSysName = item.get('systemName');
          var actived = item.get("active");

          // must be actived role.
          var isValidItem = onlyActivedRoles === true ? (actived === true) : true;

          debug('roleSysName:', roleSysName, roles);
          if (isValidItem && _.include(roles, roleSysName)) {
            matched = true;
            debug('found matched role:', SystemRoleName[roleSysName]);
            return false;
          }
        });
        return matched ? user : null;
      }
      var _cachedRoles = user.roles || [];
      // if we have already cache roles of current user, avoid re fetch from database.
      if (_cachedRoles.length) {
        debug('checking user role in cached roles: ', _cachedRoles);
        var deferred = q.defer();
        deferred.resolve(isRoleMatched(_cachedRoles));
        return deferred.promise;
      } else {
        debug('checking user role via db ...');
        return user.getRoles().then(function (_roles) {
          return isRoleMatched(_roles);
        });
      }
    },
    /**
     * Check current user if belong to sepcificed roles.
     * @param  {Number}   roleSystemName   roleName SystemRoleName['administrators'] ==>0
     * @param  {Boolean}  onlyActivedRoles
     * @return {Promise}  parameter is (user/null)
     */
    isInCustomerRole: function (roleSystemName, onlyActivedRoles) {
      onlyActivedRoles = _.isUndefined(onlyActivedRoles) ? true : !!onlyActivedRoles;
      return this.isCustomerInRoles(roleSystemName, onlyActivedRoles);
    },
    // Admin Role
    isAdmin: function (onlyActivedRoles) {
      return this.isInCustomerRole(SystemRoleName.Administrators, onlyActivedRoles);
    },
    // Registered role.
    isRegistered: function (onlyActivedRoles) {
      return this.isInCustomerRole(SystemRoleName.Registered, onlyActivedRoles);
    },
    // Guest role
    isPublisher: function (onlyActivedRoles) {
      return this.isInCustomerRole(SystemRoleName.Publisher, onlyActivedRoles);
    }
  }
});

module.exports = User;
