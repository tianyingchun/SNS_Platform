var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'Category';

var attributes = {
  // seo purpose for Category page
  metaTitle: {
    type: Sequelize.STRING,
    field: 'meta_title'
  },

  metaKeyword: {
    type: Sequelize.STRING,
    field: 'meta_keyword'
  },

  metaDescription: {
    type: Sequelize.STRING,
    field: 'meta_description'
  },

  name: {
    type: Sequelize.STRING,
    validate: {
      len: [10, 50]
    }
  },

  parentCategoryId: {
    type: Sequelize.INTEGER,
    field: 'parent_category_id'
  },

  displayOrder: {
    type: Sequelize.INTEGER,
    field: 'display_order',
    defaultValue: 0
  },

  published: {
    type: Sequelize.BOOLEAN
  },

  deleted: {
    type: Sequelize.BOOLEAN
  }
};

// merge base to each model.
_.extend(attributes, base);

var Category = sequelize.define(modelName, attributes, {
  timestamps: true,
  tableName: db.getTableName(modelName),
  underscored: true
});


module.exports = Category;
