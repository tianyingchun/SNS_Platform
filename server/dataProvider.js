var fs = require("fs-extra");
var _ = require("underscore");
var config = require("./config")();
var logger = require("./helpers/log");

function getConfig(type) {
  var config = {};
  if (!type) {
    logger.error("We must provider type name to get specifie config node!");
    return config;
  }
  switch (type) {
    case "product":
      config = fs.readJsonSync("../app_configs/product_config.json");
      break;
    case "picture":
      config = fs.readJsonSync("../app_configs/picture_config.json");
      break;
    case "system":
      config = fs.readJsonSync("../app_configs/system_config.json");
      break;
    case "context":
      config = fs.readJsonSync("../app_configs/context_config.json");
      break;
  }
  // logger.debug("current config info: ", config);
  return config;
}
/**
 * in order to support multi data spider source.
 * @param  {string} dalName data access name
 */
function getCurrentSpiderRepository(dalName) {
  var contextCfg = getConfig("context");
  var spiderProvider = "aliexpress";
  try {
    var spiderProvider = contextCfg.crawl_config.configs.crawl_provider.value;
  } catch (e) {
    logger.error("get current spider repository failed!: ", e);
    spiderProvider = "aliexpress";
  }
  return spiderProvider + "/" + dalName;
}

module.exports = {
  /**
   * Get data service singleton constructor.please make sure that we invoke getService in each invoke method,
   * otherwise it will get instance cache in nodejs.
   * @param  {string} serviceName  the service name, e.g.  product, user
   * @return {constructor}
   */
  getService: function (serviceName) {
    if (serviceName) {
      serviceName = serviceName.replace(/Service$/ig, "") + "Service";
      var ServiceClass = require("./services/" + serviceName);
      return ServiceClass;
    } else {
      logger.error("We must provider a service name to auto fecth service constructor!");
    }
  },
  /**
   * Get data access corresponding constructor.
   * @param  {string} provider the data provider default value configed from /config/index.js
   * @param  {string} dalName service name, e.g. catalogDal  canbe write catalog also with short cut name.
   * @return {constructor}  DataAccess class.
   */
  getDataAccess: function (provider, dalName) {
    if (arguments.length == 1) {
      dalName = provider;
      provider = config.defaultDataProvider;
    }
    if (dalName) {
      dalName = dalName.replace(/Dal$/ig, "") + "Dal";
    } else {
      logger.error("We must provider data access name!");
    }
    switch (provider) {
      case "spider":
        dalName = getCurrentSpiderRepository(dalName);
        break;
    }
    var DataAccessClass = require(["./datalayer", provider, dalName].join('/'));

    return DataAccessClass;
  },
  /**
   * Get model entity constructor
   * @param  {string} modelName model constructor name.
   * @return {constructor}  entity model class.
   */
  getModel: function (modelName) {
    if (modelName) {
      return require("./models/" + modelName);
    } else {
      logger.error("We must provider a model name to fetch model constructor!");
    }
  }
};
