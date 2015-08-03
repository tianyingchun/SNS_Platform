var _ = require('lodash');
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
      len: [10, 200]
    }
  },

  shortDesc: {
    type: Sequelize.STRING,
    field: 'short_desc',
    validate: {
      len: [0, 200]
    }
  },

  fullDesc: {
    type: Sequelize.TEXT,
    field: 'full_desc',
    allowNull: true
  },

  //0: 虚拟产品 （点券）
  //1：实物产品，暂时靠商家自己去给用户发货，他需要描述到name, fullDesc.
  productType: {
    type: Sequelize.INTEGER,
    field: 'product_type',
    defaultValue: 0
  },

  // 当期商品的实际价值
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },

  // 申请当前产品的需要消耗的账户点(Rewards Point)，默认一般都是免费得
  needSpendPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
    field: 'need_spend_price'
  },

  // 设置一个获得这个产品的门槛，比如100，用户所有的TASK 的reward 之和达到了这个数值
  // 他就可以获得这个产品
  threshold: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  adminComment: {
    type: Sequelize.STRING,
    field: 'admin_comment',
    allowNull: true
  },

  availableQuantity: {
    type: Sequelize.INTEGER,
    field: 'available_quantity',
    defaultValue: 0
  },

  stockQuantity: {
    type: Sequelize.INTEGER,
    field: 'stock_quantity',
    defaultValue: 0
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

  // 0-100
  totalReviews: {
    type: Sequelize.INTEGER,
    field: 'total_reviews',
    defaultValue: 0
  },

  averageRating: {
    type: Sequelize.INTEGER,
    field: 'average_rating',
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
  tableName: db.getTableName(modelName),
  underscored: true
});

module.exports = Product;
