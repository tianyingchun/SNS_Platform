var Sequelize = require('sequelize');
var _ = require('lodash');
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

  // provider instance method for get seo url for title.
  getSeoName: function (name) {
    if (!name) return name;
    var okChars = "abcdefghijklmnopqrstuvwxyz1234567890 _-";
    name = name.trim().toLowerCase();
    var sb = [];

    _.forEach(name, function (c) {
      if (_.contains(okChars, c)) {
        sb.push(c);
      }
    });

    var name2 = sb.join('')
      .replace(/\s+/ig, '-')
      .replace(/(-)+/ig, '-')
      .replace(/(\_)+/ig, '_');

    return name2;
  }
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
