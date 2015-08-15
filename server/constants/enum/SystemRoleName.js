var lang = require('../../common/lang');

var SystemRoleName = lang.createEnum(
  [
    'Administrators',
    'Registered',
    'Guests'
  ]
);

module.exports = SystemRoleName;
