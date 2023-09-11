const db = require('./database');

const Product = db.models.Product;
const User = db.models.User;
const productCategory = db.models.productCategory;
db.sync().then(async result=>{
    let user = await User.findOne({
        where: {
            id: 1
        },
        include: [{
            model: Product,
            include: [productCategory]
        }]
    });
    console.log(user.dataValues);
}).catch(err=>{
    console.log(err);
});