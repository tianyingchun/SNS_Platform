var lang = require('../common/lang');
var Error = lang.createError('BusinessError', {
  status: 400
});
// new Error('code', 'message');
module.exports = Error;
module.exports.Message = function (locale) {
  // i18n
  return {
    'USER_HAS_EXISTED': {
      code: 'USER_HAS_EXISTED',
      message: 'User or email is already taken'
    },
    'ROLE_CAN_NOT_BE_FOUND': {
      code: 'ROLE_CAN_NOT_BE_FOUND',
      message: 'Can not find the records using given roles.'
    },
    'USER_SIGNIN_FAILED': {
      code: 'USER_SIGNIN_FAILED',
      message: 'Incorrect username or password.'
    },
    'GEN_ACCESS_TOKEN_FAILED': {
      code: 'GEN_ACCESS_TOKEN_FAILED',
      message: 'access_token generated failed!'
    }
  };
};
