var _ = require('underscore');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var base = require('./base');
var db = require('../config').db;
var modelName = 'Product';

var attributes = {
  // seo purpose for product page
  metaTitle: {
    type: Sequelize.STRING,
    field: 'meta_title'
  },

  metaKeyword: {
    type: Sequelize: STRING,
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

  shortDesc: {
    type: Sequelize.STRING,
    field: 'short_desc',
    validate: {
      len: [5, 100]
    }
  },

  fullDesc: {
    type: Sequelize.STRING,
    field: 'full_desc',
    allowNull: true
  },

  adminComment: {
    type: Sequelize.STRING,
    field: 'admin_comment',
    allowNull: true
  },

  availableQuantity: {
    type: Sequelize.INTEGER,
    field: 'available_quantity',
    defaultValue: -1
  },

  availableStartTime: {
    type: Sequelize.DATE,
    field: 'availble_start_time',
    allowNull: true
  },

  availableEndTime: {
    type: Sequelize.DATE,
    field: 'available_end_time',
    allowNull: true
  },

  // 是否允许用户评论
  allowReviews: {
    type: Sequelize.BOOLEAN,
    field: 'allow_reviews',
    defaultValue: true
  },

  totalReviews: {
    type: Sequelize.INTEGER,
    field: 'total_reviews',
    defaultValue: 0
  },

  ratingSum: {
    type: Sequelize.INTEGER,
    field: 'rating_sum',
    defaultValue: 0
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

var Product = sequelize.define(modelName, attributes, {
  timestamps: true,
  comment: 'The products published on site product list', //table comment
  indexes: [{
    name: 'display_order',
    method: 'BTREE',
    // A BTREE index with a ordered field
    fields: ['displayOrder', {
      collate: 'en_US',
      order: 'DESC',
      length: 5
    }]
  }],
  tableName: db.getTableName(modelName)
});

module.exports = Product;
