var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');

var modelName = 'Country';


var attributes = {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  twoLetterIsoCode: {
    type: Sequelize.STRING,
    field: 'two_letter_iso_code'
  },
  threeLetterIsoCode: {
    type: Sequelize.STRING,
    field: 'three_letter_iso_code'
  },
  numericIsoCode: {
    type: Sequelize.STRING,
    field: 'numeric_iso_code'
  },
  published: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  displayOrder: {
    type: Sequelize.INTEGER,
    field: 'display_order',
    defaultValue: 0
  }
};
// merge base to each model.
_.extend(attributes, base);

var Country = sequelize.define(modelName, attributes, {
  // timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = Country;
