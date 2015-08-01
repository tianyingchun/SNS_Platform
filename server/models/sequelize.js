var Sequelize = require('sequelize');

var config = require('../config').db;
var db = config.db;

var sequelize = new Sequelize(db.database, db.username, db.password, db.options);

module.exports = sequelize;
