var lang = require('../../helpers/lang');

var SystemRoleNames = lang.createEnum(
  [
    'Administrators',
    'Registered',
    'Guests'
  ]
);

module.exports = SystemRoleNames;
