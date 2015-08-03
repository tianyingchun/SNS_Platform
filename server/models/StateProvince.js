var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');

var modelName = 'StateProvince';

var attributes = {
  countryId: {
    type: Sequelize.INTEGER,
    field: 'country_id'
  },
  name: {
    type: Sequelize.STRING
  },
  abbreviation: {
    type: Sequelize.STRING
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

var StateProvince = sequelize.define(modelName, attributes, {
  // timestamps: true,
  tableName: db.getTableName(modelName)
});

module.exports = StateProvince;
