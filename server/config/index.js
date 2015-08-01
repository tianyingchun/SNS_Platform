var _ = require("underscore");

// site configuration.
var config = {
  appName: "SNS-Platform",
  defaultDataProvider: "mysql" // maybe sqlserver
};

// mysql database.
var db = {
  database: 'SNS_Platform',
  username: 'sns',
  password: '',
  // db configuration.
  options: {
    dialect: 'mysql',
    host: 'localhost',
    port: '3307',
    timezone: '+08:00',
    logging: console.log
  },
  getTableName: function (tabName) {
    // Social network marketing platform
    return 'smp_' + tableName.toLowerCase();
  }
};

// exports site configuration.
module.exports = _.extend({}, config, {
  db: db
});
