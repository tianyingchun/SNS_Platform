var debug = require('debug')('app:PictureService');

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
      return ProductModel.scope(type).findAll();
    }
    return ProductModel.findById(id);
  },

  createProduct: function (product, user) {
    return ProductModel.create(product).then(function (product) {
      return product.setUser(user);
    });
  },

  updateProduct: function (product) {
    return ProductModel.findById(product.id).then(function (product) {

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
        throw new Error('product not found.');
      }
    });
  }
};

module.exports = ProductService;
