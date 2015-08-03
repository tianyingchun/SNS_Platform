var _ = require('lodash');

// require all data model schema here.
var association = require('./association');
//

var syncOptions = {
  force: true,
  match: /_Test$/
};

module.exports = {
  /**
   * Provider api to sync create databse and tables.
   * @param  {Object} options  sequelize sync configuration
   * @return {Promise}         promise
   */
  syncDB: function (options) {
    var sync = _.extend({}, syncOptions, options);
    return sequelize.sync(sync);
  }
};
