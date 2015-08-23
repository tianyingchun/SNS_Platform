/**
 * The error definitions for en-us
 * @type {Object}
 */
module.exports = {
  COMMON: {
    'ACCESS_DENY': {
      code: 'ACCESS_DENY',
      message: 'access deny, you are no permission to access.'
    },
    'DE_SERIALIZE_FAILED': {
      code: 'DE_SERIALIZE_FAILED',
      message: 'deSerialize failed .'
    }
  },
  TOKEN: {
    'EMPTY': {
      code: 'TOKEN_EMPTY',
      message: 'parsed token is empty.'
    },
    'EXPIRED': {
      code: 'TOKEN_EXPIRED',
      message: 'the token has been expired.'
    },
    'REQUIRED_USER_ID': {
      code: 'ACCESS_TOKEN_REQUIRED_USERID',
      message: 'access token required user id.'
    },
    'REDIS_QUERY_FAILED': {
      code: 'TOKEN_PARSE_FAILED',
      message: 'the token has been expired.'
    },
    'GEN_ACCESS_TOKEN_FAILED': {
      code: 'GEN_ACCESS_TOKEN_FAILED',
      message: '`access_token` generated failed.'
    }
  },
  USER: {
    'UNKNOWN': {
      code: 'USER_UNKNOWN',
      message: 'unknown user.'
    },
    'HAS_EXISTED': {
      code: 'USER_HAS_EXISTED',
      message: 'User or email is already taken.'
    },
    'CAN_NOT_BE_FOUND': {
      code: 'USER_CAN_NOT_BE_FOUND',
      message: 'Can not find the records using given user id.'
    },
    'SIGNIN_FAILED': {
      code: 'USER_SIGNIN_FAILED',
      message: 'Incorrect username or password.'
    },
    'PASSWORD_MUSTBE_REQUIRED': {
      code: 'PASSWORD_MUSTBE_REQUIRED',
      message: 'password must be required.'
    },
    'CANT_DELETE_YOUR_SELF': {
      code: 'CANT_DELETE_YOUR_SELF',
      message: 'can\'t delete yourself.'
    },
    'DESTROY_FAILED': {
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
    'SIGN_UP_FAILED': {
      code: 'SIGN_UP_FAILED',
      message: 'user sign up failed.'
    }
  },
  ROLE: {
    'NOT_MATCHED_ROLES': {
      code: 'NOT_MATCHED_ROLES',
      message: 'use not belong to required roles.'
    },
    'CAN_NOT_BE_FOUND': {
      code: 'ROLE_CAN_NOT_BE_FOUND',
      message: 'Can not find the records using given roles.'
    }
  },
  PRODUCT: {
    'NOT_FOUND': {
      code: 'PRODUCT_NOT_FOUND',
      message: 'Product can not found.'
    },
    'NO_PERMISSION': {
      code: 'NO_PERMISSION',
      message: 'You cannot work on this product.'
    },
    'CAN_NOT_UPDATE_PUBLISHED_PRODUCT': {
      code: 'CAN_NOT_UPDATE_PUBLISHED_PRODUCT',
      message: 'You cannot udpate this product since it has been published.'
    },
    'CAN_NOT_DELETE_PUBLISHED_PRODUCT': {
      code: 'CAN_NOT_DELETE_PUBLISHED_PRODUCT',
      message: 'You cannot delete this product since it has been published.'
    },
  },
  CACHE: {
    'REDIS_QUERY_FAILED': {
      code: 'REDIS_QUERY_FAILED',
      message: 'get cached data from redis failed.'
    },
    'CACHE_KEY_IS_INVALID': {
      code: 'CACHE_KEY_IS_INVALID',
      message: 'The cache key is invalid.'
    }
  },
  URLRECORD: {
    CAN_NOT_BE_FOUND: {
      code: 'CAN_NOT_BE_FOUND',
      message: 'The url record can\'t be found in database.'
    }
  }
};
