var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'Product';

var attributes = {
  // seo purpose for product page
  metaTitle: {
    type: Sequelize.STRING
  },

  metaKeyword: {
    type: Sequelize: STRING
  },

  metaDescription: {
    type: Sequelize.STRING
  },

  name: {
    type: Sequelize.STRING,
    validate: {
      len: [10, 50]
    }
  },

  shortDesc: {
    type: Sequelize.STRING,
    validate: {
      len: [5, 100]
    }
  },

  fullDesc: {
    type: Sequelize.STRING,
    allowNull: true
  },

  adminComment: {
    type: Sequelize.STRING,
    allowNull: true
  },

  availableQuantity: {
    type: Sequelize.NUMBER,
    defaultValue: -1
  },

  availableStartTime: {
    type: Sequelize.DATE,
    allowNull: true
  },

  availableEndTime: {
    type: Sequelize.DATE,
    allowNull: true
  },

  // 是否允许用户评论
  allowReviews: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },

  totalReviews: {
    type: Sequelize.NUMBER,
    defaultValue: 0
  },

  ratingSum: {
    type: Sequelize.NUMBER
    defaultValue: 0
  },

  displayOrder: {
    type.Sequelize.NUMBER,
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

var Product = sequelize.define(modelName, attributes, {
  tableName: db.getTableName(modelName)
});

module.exports = Product;
