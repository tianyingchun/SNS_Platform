var debug = require('debug')('app:PictureService');
var Error = require('../constants/Error');

var ProductModel = require('../models/Product.js');

var ProductService = {

  findAllProducts: function (type) {
    if (type) {
      return ProductModel.scope(type).findAll();
    }
    return ProductModel.findAll();
  },

  findProductById: function (id, type) {
    if (type) {
      return ProductModel.scope(type).findById(id);
    }
    return ProductModel.findById(id);
  },

  createProduct: function (product, user) {
    return ProductModel.create(product).then(function (product) {
      return product.setUser(user);
    });
  },

  updateProduct: function (obj) {
    return ProductModel.unscoped().findById(obj.id).then(function (product) {
      if (product) {
        return product.update(obj);
      } else {
        throw new Error('PRODUCT.NOT_FOUND');
      }
    });
  },

  deleteProduct: function (id) {
    return ProductModel.scope('all').findById(id).then(function (product) {
      if (product) {
        product.deleted = true;
        return product.save({
          field: ['deleted']
        });
      } else {
        throw new Error('PRODUCT.NOT_FOUND');
      }
    });
  }
};

module.exports = ProductService;
