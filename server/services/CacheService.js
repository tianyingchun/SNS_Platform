var _ = require('lodash');
var q = require('q');
var redis = require('../common/redis');
var debug = require('debug')('app:CacheService');
var security = require('../config').security;

function serialize(data) {
  return JSON.stringify(data);
}

function deSerialize(data) {
  return JSON.parse(data);
}

/**
 * The redis cache repository.
 * @param {Object} options the cache configurations
 */
function RedisCache(options) {
  options = options || {};
  this.prefix = _.isUndefined(options.prefix) ? 'cache:' : options.prefix;
  // default cache provider is redis.
  this._redis = redis.new({
    keyPrefix: this.prefix
  });
}

_.extend(RedisCache.prototype, {
  /**
   * Gets or sets the value associated with the specified key.
   * @param  {Strubg}   key      The key of the value to get.
   * @return {Promise<data>}     The value associated with the specified key
   */
  get: function (key) {
    return this._redis.get(key)
      .then(function (data) {
        if (!data) {
          debug('redis.get() ->data: ', data);
          // query redis exception or redis token expired.
          throw new Error('CACHE.REDIS_QUERY_FAILED');
        } else {
          //return `cached` data.
          return deSerialize(data);
        }
      });
  },
  /**
   * Adds the specified key and object to the cache.
   * @param {String}   key
   * @param {Any}      data
   * @param {Number}   cacheTime Cache time (second) default: config.security.cacheTime
   * @return {Promise<Boolean>} Result: true has been added success.
   */
  set: function (key, data, cacheTime) {
    cacheTime = cacheTime || security.cacheTime;
    var self = this;
    return self._redis.set(key, serialize(data))
      .then(function () {
        // set default expire time second.
        return self._redis.expire(key, cacheTime).then(function (affectedRow) {
          debug('redis.set().affectedRow:', affectedRow);
          return affectedRow > 0;
        });
      });
  },
  /**
   * Gets a value indicating whether the value associated with the specified key is cached
   * @param  {String}  key
   * @return {Promise<Boolean>} Result: true has been existed.
   */
  isSet: function (key) {
    return this._redis.exists(key).then(function (matchedRows) {
      debug('redis.exists().matchedRows:', matchedRows);
      return matchedRows > 0;
    });
  },

  /**
   * Gets a value indicating whether the value associated with the specified key is cached
   * @param  {String} key
   * @return {Promise<Boolean>} Result: true has been removed.
   */
  remove: function (key) {
    return this._redis.del(key).then(function (affectedRow) {
      debug('redis.remove().key:%s, affectedRow:%s', key, affectedRow);
      return affectedRow > 0;
    });
  },

  /**
   * Removes items by  pattern
   * @param  {String}  pattern pattern
   * @return {Boolean} Result: true has been removed.
   */
  removeByPattern: function (pattern) {
    var self = this;
    return self._redis.keys(this.prefix + pattern).then(function (items) {
      var queues = [];
      _.forEach(items, function (key) {
        key = key.replace(new RegExp('^' + self.prefix), '');
        queues.push(self.remove(key));
      });
      return q.all(queues);
    });
  },

  /**
   * Clear all cache data
   * Clear all keys of current databases: flushdb
   * Clear all keys of all databases: flushall
   * @return {Promise<String>} 'OK'
   */
  clear: function () {
    return this._redis.flushall().then(function (result) {
      debug('redis.clear().result', result);
      return result;
    });
  }
});

var cacheProvider = new RedisCache({
  prefix: ''
});

_.extend(cacheProvider, {
  // we can indicates options to set cache key prefix. (we can see cache key clearly)
  new: function (options) {
    return new RedisCache(options);
  }
});

module.exports = cacheProvider;
