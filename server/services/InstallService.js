var q = require('Q');
var debug = require('debug')('app:InstallService');
var RoleModel = require('../models/Role');
var UserModel = require('../models/User');
var SystemRoleName = require('../constants/enum/SystemRoleName');
var UserService = require('./UserService');

var InstallService = {
  // create roles.
  initialRoles: function () {
    var roles = [];
    roles.push({
      name: SystemRoleName[0],
      isSystemRole: true,
      active: true,
      systemName: SystemRoleName.Administrators
    });
    roles.push({
      name: SystemRoleName[1],
      isSystemRole: true,
      active: true,
      systemName: SystemRoleName.Registered
    });
    roles.push({
      name: SystemRoleName[2],
      isSystemRole: true,
      active: true,
      systemName: SystemRoleName.Publisher
    });

    return RoleModel.bulkCreate(roles);
  },
  // create default administrator.
  initialUser: function () {
    var user = {
      username: 'administrator',
      email: '981919332@qq.com',
      password: '111111',
      active: true,
      deleted: false,
      isSystemAccount: true,
      lastIpAddress: '127.0.0.1'
    };
    return UserService.signup(user).then(function (user) {
      debug('init user done!');
      return RoleModel.findOne({
        where: {
          systemName: SystemRoleName.Administrators
        }
      }).then(function (role) {
        debug('add Administrators for user');
        return user.addRole(role).then(function () {
          return user;
        });
      });
    });
  },

  start: function () {
    var self = this;
    return this.initialRoles().then(function () {
      return self.initialUser();
    });
  }
};

module.exports = InstallService;
