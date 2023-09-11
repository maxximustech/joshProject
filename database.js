const { Sequelize } = require('sequelize');

const Product = require('./models/product');
const User = require ('./models/user');
const productCategory = require('./models/productCategory');
const Cart = require ('./models/cart');

const db = new Sequelize('josh','root','Maxximus2013',{
    host: 'localhost',
    dialect: 'mysql'
});

const productModel = db.define(Product.modelName,Product.attributes);
const userModel = db.define(User.modelName, User.attributes);
const productCategoryModel = db.define(productCategory.modelName, productCategory.attributes);
const cartModel = db.define(Cart.modelName, Cart.attributes);

userModel.hasMany(productModel,{
    foreignKey: 'userId'
});
productModel.belongsTo(userModel,{
    foreignKey: 'userId'
});

cartModel.belongsTo(productModel,{
    foreignKey: 'productId'
});

cartModel.belongsTo(userModel,{
    foreignKey: 'userId'
});

userModel.hasMany(cartModel,{
    foreignKey: 'userId'
});

productModel.belongsToMany(productCategoryModel,{
    through: 'proCat'
});

productCategoryModel.belongsToMany(productModel,{
    through: 'proCat'
});

module.exports = db;

