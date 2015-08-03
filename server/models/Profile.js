var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var db = require('../config').db;
var base = require('./base');

var User = require('./User.js');

var modelName = 'Profile';

var attributes = {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  mobile: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  sex: {
    type: Sequelize.STRING,
    field: 'last_name'
  }
};
// merge base to each model.
_.extend(attributes, base);

var Profile = sequelize.define(modelName, attributes, {
  // timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true,
  getterMethods: {
    // define virtual attribute,are not actually part of your database schema
    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    }
  },
  setterMethods: {
    fullName: function (val) {
      // Note. the virtual setter method have no validate() method.
      var names = (val || "").split(' ');
      this.setDataValue('firstName', names[0] || "");
      this.setDataValue('lastName', names[1]) || "";
    }
  }

});

Profile.belongsTo(User);

module.exports = Profile;
