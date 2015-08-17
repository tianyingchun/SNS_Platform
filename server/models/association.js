// require all data model schema here.
var sequelize = require('./sequelize');
var db = require('../config').db;
// User     //
//-----------------------------------------//
var User = require('./User');
var Role = require('./Role');
var Privilege = require('./Privilege');
var Profile = require('./Profile');
var Country = require('./Country');
var StateProvince = require('./StateProvince');

var UserRole = db.getTableName('user_role');
// Notice that the spelling must be the exact same as the one in the association
// in UserService query include:[model:RoleModel, as:'roles']
Role.belongsToMany(User, {through: UserRole, as: 'users'});
User.belongsToMany(Role, {through: UserRole, as: 'roles'});

User.hasMany(Profile, {as: 'profiles'});

// Product  //
//-----------------------------------------//
var Product = require('./Product');
// var ProductAttribute = require('./ProductAttribute');
// var ProductAttributeValue = require('./ProductAttributeValue');
var ProductTag = require('./ProductTag');
var Category = require('./Category');

var CategoryProduct = db.getTableName('category_product');
// One-to-many association,category.getProducts().
Category.belongsToMany(Product, {through: CategoryProduct});
Product.belongsToMany(Category, {through: CategoryProduct});

var ProductTagMapping = db.getTableName('product_tag_mapping');
ProductTag.belongsToMany(Product, {through: ProductTagMapping});
Product.belongsToMany(ProductTag, {through: ProductTagMapping});

Product.belongsTo(User);
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
