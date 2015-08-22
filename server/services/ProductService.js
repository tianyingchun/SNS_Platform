var debug = require('debug')('app:ProductService');
var Error = require('../constants/Error');

var ProductModel = require('../models/Product.js');
var TaskModel = require('../models/Task.js');

var ProductService = {

  /**
   * only user himself or admin can update or delete product
   * @param  {[type]} product [description]
   * @param  {[type]} user    [description]
   * @return {[type]}         [description]
   */
  checkProductWithUser: function (product, user) {
    debug('check product with user', product.user_id, user.id);
    return product.user_id === user.id || user.isAdmin();
  },

  findAllProducts: function (params) {
    var productPromise = ProductModel;
    var _limit = params.size;
    var _offset = (params.page - 1) * params.size;
    if (params.type) {
      productPromise = productPromise.scope(params.type);
    }
    return productPromise.findAll({
      limit: _limit,
      offset: _offset
    });
  },

  findProductById: function (id, type) {
    if (type) {
      return ProductModel.scope(type).findById(id);
    }
    return ProductModel.findById(id).then(function (product) {
      if (product) {
        return product;
      }
      throw new Error('PRODUCT.NOT_FOUND');
    });
  },

  createProduct: function (product, user) {
    return ProductModel.create(product).then(function (product) {
      return product.setUser(user);
    });
  },

  updateProduct: function (payload, user) {
    var self = this;
    return ProductModel.unscoped().findById(payload.id).then(function (product) {
      if (product) {
        // check product with user
        if (!self.checkProductWithUser(product, user)) {
          throw new Error('PRODUCT.NO_PERMISSION');
        }
        if (product.published === true) {
          throw new Error('PRODUCT.CAN_NOT_UPDATE_PUBLISHED_PRODUCT');
        }
        return product.update(payload);
      } else {
        throw new Error('PRODUCT.NOT_FOUND');
      }
    });
  },

  deleteProduct: function (id, user) {
    var self = this;
    return ProductModel.unscoped().findById(id).then(function (product) {
      if (product) {
        //check product with user
        if (!self.checkProductWithUser(product, user)) {
          throw new Error('PRODUCT.NO_PERMISSION');
        }
        //check product whether in publish status
        if (product.published === true) {
          throw new Error('PRODUCT.CAN_NOT_DELETE_PUBLISHED_PRODUCT');
        }
        //check product has been deleted
        if (product.deleted === true) {
          throw new Error('PRODUCT.NOT_FOUND');
        }

        product.deleted = true;
        return product.save({field: ['deleted']});
      } else {
        throw new Error('PRODUCT.NOT_FOUND');
      }
    });
  },

  findAllTasksByProductId: function (id) {
    return ProductModel.findById(id).then(function (product) {
      if (product) {
        return product.getTasks();
      }
      throw new Error('PRODUCT.NOT_FOUND');
    })
  },

  findOneTaskUnderProduct: function (arguments) {

  }


};

module.exports = ProductService;
