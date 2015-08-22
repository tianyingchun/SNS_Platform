var _ = require('lodash');
var Error = require('../constants/Error');
var lang = require('../common/lang');
var _cacheManager = require('./CacheService');
var UrlRecordModel = require('../models/UrlRecord');

/**
 * Key for caching
 * {0} : entity ID
 * {1} : entity name
 * {2} : language ID
 */
var URLRECORD_ACTIVE_BY_ID_NAME_LANGUAGE_KEY = "app.urlrecord.active.id-name-language-{0}-{1}-{2}";

// Key for caching
var URLRECORD_ALL_KEY = "app.urlrecord.all";

/**
 * Key for caching
 * {0} : slug
 */
var URLRECORD_BY_SLUG_KEY = "app.urlrecord.active.slug-{0}";
// Key pattern to clear cache
var URLRECORD_PATTERN_KEY = "app.urlrecord.*";

// caching record.
function UrlRecordForCaching(id, entityId, entityName, slug, active) {
  this.id = id;
  this.entityId = entityId;
  this.entityName = entityName;
  this.slug = slug;
  this.active = active;
}
/**
 * Convert UrlRecordModel instance to UrlRecordForCaching.
 * @param {Object} record UrlRecordModel instance.
 */
function map(record) {
  if (record == null)
    throw new Error('URLRECORD.CAN_NOT_BE_FOUND');

  var urlRecordForCaching = new UrlRecordForCaching(
    record.id,
    record.entityId,
    record.entityName,
    record.slug,
    record.active
  );
  return urlRecordForCaching;
}

var UrlRecordService = {
  //@private
  _mixinScopes: function (scope) {
    var _scope = ['defaultScope'];
    if (_.isArray(scope)) {
      _scope = _scope.concat(scope);
    } else if (_.isString(scope)) {
      _scope.push(scope);
    }
    debug('_mixinScopes: ', _scope);
    return _scope;
  },
  /**
   * Gets all cached URL records
   * @return Promise({Array<UrlRecordForCaching>}) cached URL records
   */
  getAllUrlRecordsCached: function () {
    //cache
    var key = lang.stringFormat(URLRECORD_ALL_KEY);
    return _cacheManager.get(key, function () {
      return UrlRecordModel.findAll()
        .then(function (urlRecords) {
          var results = [];
          _.forEach(urlRecords || [], function (record) {
            results.push(map(record));
          });
          return results;
        });
    });
  },
  getAllUrlRecords: function (page, size, scope, query) {
    if (page == 0) page = 1;
    // now simple use limit, offset, maybe need to use store procedure to improve performance
    var offset = size * (page - 1);
    scope = this._mixinScopes(scope);
    // TODO Note. findAndCountAll has an bug ? while using scope().
    // So we must first get count(). then findAll().
    return UrlRecordModel.scope(null).count().then(function (count) {
      if (count === 0) {
        return {
          count: count || 0,
          rows: []
        };
      }
      return UrlRecordModel.scope(scope).findAll({
        where: query,
        offset: offset,
        limit: size
      }).then(function (results) {
        return {
          count: count || 0,
          rows: (results && _.isArray(results) ? results : [])
        };
      });
    });
  },
  /**
   * Deletes an URL record
   * @param  {Object} urlRecord  URL record
   * @return {Promise}
   */
  deleteUrlRecord: function (urlRecord) {
    if (urlRecord == null) {
      throw new Error("URLRECORD.CAN_NOT_BE_FOUND");
    }

    return UrlRecordModel.destroy({
      where: {
        id: urlRecord.id
      }
    }).then(function () {
      return _cacheManager.removeByPattern(URLRECORD_PATTERN_KEY);
    });
  },
  /**
   * Gets an URL record
   * @param  {String} id URL record identifier
   * @return {Promise}
   */
  getUrlRecordById: function (id) {
    if (id == 0) {
      return null;
    }
    return UrlRecordModel.findById(id);
  },
  /**
   * Inserts an URL record
   * @param  {Object} urlRecord URL record
   * @return {Promise}
   */
  insertUrlRecord: function (urlRecord) {
    if (urlRecord == null) {
      throw new Error("URLRECORD.CAN_NOT_BE_FOUND");
    }
    return UrlRecordModel.create(urlRecord)
      .then(function () {
        return _cacheManager.removeByPattern(URLRECORD_PATTERN_KEY);
      });
  },
  /**
   * Updates an URL record
   * @param  {Object} urlRecord URL record
   * @return {Promise}
   */
  updateUrlRecord: function (urlRecord) {
    if (urlRecord == null) {
      throw new Error("URLRECORD.CAN_NOT_BE_FOUND");
    }
    return UrlRecordModel.findOrCreate({
      where: {
        id: urlRecord.id
      },
      defaults: urlRecord
    }).then(function (newRecord) {
      return _cacheManager.removeByPattern(URLRECORD_PATTERN_KEY);
    });
  },
  /**
   * Find URL record
   * @param  {String} slug the slug
   * @return {Promise<String>} Found URL record
   */
  getBySlug: function (slug) {
    return UrlRecordModel.findOne({
      where: {
        slug: slug
      }
    });
  },

  /**
   * Find URL record (cached version).
   * This method works absolutely the same way as "GetBySlug" one but caches the results.
   * Hence, it's used only for performance optimization in public store
   * @param  {String} slug
   * @return {Promise<String>} Found URL record
   */
  getBySlugCached: function (slug) {
    //gradual loading
    var key = lang.stringFormat(URLRECORD_BY_SLUG_KEY, slug);
    var self = this;
    return _cacheManager.get(key, function () {
      var urlRecord = self.getBySlug(slug);
      if (urlRecord == null) {
        return null;
      }
      var urlRecordForCaching = map(urlRecord);
      return urlRecordForCaching;
    });
  },

  /**
   * Find slug
   * @param  {String} entityId   Entity identifier
   * @param  {String} entityName Entity name
   * @return {Promise}
   */
  getActiveSlug: function (entityId, entityName) {

  },

  saveSlug: function (slug) {

  }
};
module.exports = UrlRecordService;
