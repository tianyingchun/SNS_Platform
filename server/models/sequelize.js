var Sequelize = require('sequelize');
var _ = require('underscore');
var db = require('../config').db;

var modelDefine = {
  // diabled timestamps globally, we can enbaled it in specificed model definition
  // e.g.
  // var Post = sequelize.define('user', {}, {
  //   timestamps: true // timestamps will now be true
  // });
  timestamps: false // true by default
};

// the instance method can be usefull for models defined by sequelize.define();
// Model.build().method1();
var instanceMethods = {

};

// the class method can be usefull for models defined by sequelize.define();
// Model.method1();
var classMethods = {

};

var config =
  _.extend({
    define: modelDefine,
    instanceMethods: instanceMethods,
    classMethods: classMethods
  }, db.options);

var sequelize = new Sequelize(db.database, db.username, db.password, config);

module.exports = sequelize;
