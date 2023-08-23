const { Sequelize } = require('sequelize');

const Product = require('./models/product');

const User = require ('./models/user')
const db = new Sequelize('josh','root','Maxximus2013',{
    host: 'localhost',
    dialect: 'mysql'
});

db.define(Product.modelName,Product.attributes);
db.define(User.modelName, User.attributes);

module.exports = db;

