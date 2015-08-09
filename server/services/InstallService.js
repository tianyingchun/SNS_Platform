var q = require('Q');
var RoleModel = require('../models/Role');
var UserModel = require('../models/User');
var SystemRoleName = require('../models/enum/SystemRoleName');
var UserService = require('./UserService');
var InstallService = {
  // create roles.
  initialRoles: function () {
    var roles = [];
    roles.push({
      name: 'Administrators',
      isSystemRole: true,
      active: true,
      systemName: SystemRoleName.Administrators
    });
    roles.push({
      name: 'Registered',
      isSystemRole: true,
      active: true,
      systemName: SystemRoleName.Registered
    });
    roles.push({
      name: 'Guests',
      isSystemRole: true,
      active: true,
      systemName: SystemRoleName.Guests
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
    return UserService.signup(user).then(function (newUser) {
      return RoleModel.findOne({
        where: {
          name: 'Administrators'
        }
      }).then(function (role) {
        return UserModel.build(newUser).addRole(role);
      });
    });
  },
  start: function () {
    return this.initialRoles()
      .then(this.initialUser);
    // .then();
  }
};

module.exports = InstallService;
