const { Sequelize } = require('sequelize');

const Product = require('./models/product');
const User = require ('./models/user');
const productCategory = require('./models/productCategory');
const Cart = require ('./models/cart');

const db = new Sequelize('josh','root','Maxximus2013',{
    host: 'localhost',
    dialect: 'mysql'
});

db.define(Product.modelName,Product.attributes);
db.define(User.modelName, User.attributes);
db.define(productCategory.modelName, productCategory.attributes);
db.define(Cart.modelName, Cart.attributes);

module.exports = db;

