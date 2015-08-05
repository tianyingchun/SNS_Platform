var ProductModel = require('../models/Product.js');

var ProductService = {

  findAllProducts: function () {
    return ProductModel.findAll();
  },

  findProductById: function (id) {
    return ProductModel.findById(id);
  },

  createProduct: function (product) {
    return ProductModel.create(product);
  },

  updateProduct: function (id) {

  },

  deleteProduct: function (id) {

  },
};

module.exports = ProductService;
