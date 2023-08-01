const Product = require('./models/product');

Product.fetchOne(167343747556);
Product.fetchAll();

let product = new Product();
product.save();