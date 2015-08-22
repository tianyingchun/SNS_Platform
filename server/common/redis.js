var Redis = require('ioredis');
var _ = require('lodash');
var debug = require('debug')('app:redis');
var config = require('../config');
var redis = new Redis(_.extend(config.redis, {
  showFriendlyErrorStack: true,
  // This is the default value of `retryStrategy`
  retryStrategy: function (times) {
    var delay = Math.min(times * 2, 2000);
    return delay;
  }
}));

redis.on('connect', function () {
  debug('redis cache connect success!');
});

redis.on('err', function (err) {
  debug('redis cache exceptions!', err);
});

_.extend(redis, {
  // via `new()` manually create redis instance with customized parameters. eg. {keyPrefix:xxx}
  new: function (options) {
    return new Redis(_.extend(config.redis, options || {}));
  }
});
module.exports = redis;
