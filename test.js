const db = require('./database');

const Product = db.models.Product;
const User = db.models.User;
const Cart = db.models.Cart;
const productCategory = db.models.productCategory;
db.sync().then(async result=>{
    let carts = await Cart.findAll({
        include: Product
    });
    console.log(carts);
}).catch(err=>{
    console.log(err);
});