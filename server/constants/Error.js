var lang = require('../common/lang');
var Error = lang.createError('BusinessError', {
  status: 400
});
// new Error('code', 'message');
module.exports = Error;

// The common Error Instance definitions.
module.exports.ErrorEnum = {
  'ACCESS_DENY': new Error('ACCESS_DENY').setStatus(401)
};
module.exports.Message = function (locale) {
  // i18n
  return {
    'ACCESS_TOKEN_REQUIRED_USER_ID': {
      code: 'ACCESS_TOKEN_REQUIRED_USERID',
      message: 'access token required user id.'
    },
    'ACCESS_TOKEN_REDIS_QUERY_FAILED': {
      code: 'TOKEN_PARSE_FAILED',
      message: 'the token has been expired.'
    },
    'TOKEN_EMPTY': {
      code: 'TOKEN_EMPTY',
      message: 'parsed token is empty.'
    },
    'TOKEN_EXPIRED': {
      code: 'TOKEN_EXPIRED',
      message: 'the token has been expired.'
    },
    'USER_UNKNOWN': {
      code: 'USER_UNKNOWN',
      message: 'unknown user.'
    },
    'NOT_MATCHED_ROLES': {
      code: 'NOT_MATCHED_ROLES',
      message: 'use not belong to required roles.'
    },
    'ACCESS_DENY': {
      code: 'ACCESS_DENY',
      message: 'access deny, you are no permission to access.'
    },
    'USER_HAS_EXISTED': {
      code: 'USER_HAS_EXISTED',
      message: 'User or email is already taken.'
    },
    'ROLE_CAN_NOT_BE_FOUND': {
      code: 'ROLE_CAN_NOT_BE_FOUND',
      message: 'Can not find the records using given roles.'
    },
    'USER_CAN_NOT_BE_FOUND': {
      code: 'USER_CAN_NOT_BE_FOUND',
      message: 'Can not find the records using given user id.'
    },
    'USER_SIGNIN_FAILED': {
      code: 'USER_SIGNIN_FAILED',
      message: 'Incorrect username or password.'
    },
    'GEN_ACCESS_TOKEN_FAILED': {
      code: 'GEN_ACCESS_TOKEN_FAILED',
      message: '`access_token` generated failed.'
    },
    'PASSWORD_MUSTBE_REQUIRED': {
      code: 'PASSWORD_MUSTBE_REQUIRED',
      message: 'password must be required.'
    },

    'CANT_DELETE_YOUR_SELF': {
      code: 'CANT_DELETE_YOUR_SELF',
      message: 'can\'t delete yourself.'
    },
    'DESTROY_USER_FAILED': {
      code: 'DESTROY_USER_FAILED',
      message: 'destory user failed.'
    },
    'CANT_DELETE_SYSTEM_BUILTIN_ACCOUNT': {
      code: "CANT_DELETE_SYSTEM_BUILTIN_ACCOUNT",
      message: 'can\'t delete system builtin account.'
    },
    'UPDATE_USER_FAILED': {
      code: 'UPDATE_USER_FAILED',
      message: 'update user failed.'
    },
    'SIGN_UP_FAILED':{
      code:'SIGN_UP_FAILED',
      message:'user sign up failed.'
    }
  };
};
