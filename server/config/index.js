var _ = require("underscore");

// site configuration.
var config = {
  appName: "isomorphicApp",
  defaultDataProvider: "mongo" // maybe sqlserver
};
// web server configuration
var serverCfg = {
  local: {
    mode: "local",
    port: 3000
  },
  production: {
    mode: "production",
    port: 4000
  }
};
// exports site configuration.
module.exports = function (mode) {
  var env = mode || process.argv[2] || 'local';
  var use = serverCfg[env];
  return _.extend(use, config);
};
