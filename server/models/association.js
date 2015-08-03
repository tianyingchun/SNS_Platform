// require all data model schema here.
var sequelize = require('./sequelize');
// User     //
//-----------------------------------------//
var User = require('./User');
var Role = require('./Role');
var Privilege = require('./Privilege');
var Profile = require('./Profile');
var Country = require('./Country');
var StateProvince = reqauire('./StateProvince');

Role.belongsToMany(User, {through: 'user_role'});
User.belongsToMany(Role, {through:'user_role'});

Profile.belongsTo(User);

// Product  //
//-----------------------------------------//
var Product = require('./Product');
var ProductAttribute = require('./ProductAttribute');
var ProductAttributeValue = require('./ProductAttributeValue');
var ProductTag = require('./ProductTag');
var Category = require('./Category');

// One-to-many association,category.getProducts().
Category.belongsToMany(Product, {throught: 'category_product'});
Product.belongsToMany(Category, {throught: 'category_product'});

ProductTag.belongsToMany(Product, {throught: 'product_tag_mapping'});
Product.belongsToMany(ProductTag, {throught: 'product_tag_mapping'});

User.hasMany(Product);

// Tasks  //
//-----------------------------------------//
var Task = require('./Task');
Product.hasMany(Task);

// Orders  //
//-----------------------------------------//
var Order = require('./Order');
var OrderTask = require('./OrderTask');
Order.hasMany(OrderTask);

// Review  //
//-----------------------------------------//
var Review = require('./Review');

// Rewards  //
//-----------------------------------------//
var RewardHistory = require('./RewardHistory');

// Others  //
//-----------------------------------------//
var UrlRecord = require('./UrlRecord');



module.exports = sequelize;
