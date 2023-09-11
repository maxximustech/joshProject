const db = require('../database');
const Product = db.models.Product;
const productCategory = db.models.productCategory;
const Cart = db.models.Cart;
const User = db.models.User;

exports.getAllProducts = async (req,res)=>{
    try{
        let products = await Product.findAll();
        let categories = await productCategory.findAll({
            order: [['name','ASC']]
        });
        let carts = await Cart.findAll();
        let productIds = carts.map((cart)=>{
            return cart.dataValues.productId;
        });
        //[1,2,3]
        let cartProducts = await Product.findAll({
            where: {
                id: productIds
            }
        });
        res.render('index',{products: products, categories: categories,carts: cartProducts})
    }catch(err){
        res.send(err.message);
    }
}

exports.newProductPage = async (req,res)=>{
    try{
        let categories = await productCategory.findAll({
            order: [['name','ASC']]
        });
        res.render('new-product',{productCategories: categories})
    }catch(err){

    }
}

exports.singleProductPage = (req,res)=>{
    Product.findOne({
        where: {
            id: req.params.id
        }
    }).then(product=>{
        res.render('single-product',{product: product})
    }).catch(err=>{
        throw err;
    });
}

exports.searchProductPage = (req,res)=>{
    res.send('This is a search page')
}

exports.editProductPage = async (req,res)=>{
    let product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    res.render('edit-product',{product: product})
}

exports.createNewProduct = async (req,res)=>{
    try{
        if(typeof req.body.title !== 'string' || req.body.title.trim() === ''){
            return res.send('Title not specified')
        }
        if(typeof req.body.price !== 'string'|| req.body.price.trim() === '' || parseInt(req.body.price) <= 0){
            return res.send('Price is not valid')
        }
        if(typeof req.body.category === "undefined"){
            return res.send('Category not specified')
        }
        if(typeof req.body.description !== 'string' || req.body.description.trim() === ''){
            return res.send('Description not specified')
        }
        if(req.body.description.length < 6){
            return res.send('Description too short')
        }
        const product = await Product.create({
            ...req.body,
            userId: 1
        },{
            include: [productCategory]
        });
        product.setProductCategories(req.body.category);//'1' || ['1','2']
        res.redirect('/create-product')
    }catch(err){
        res.send(err.message);
    }
}

exports.updateProduct = async (req,res)=>{
    if(typeof req.body.title !== 'string' || req.body.title.trim() === ''){
        return res.send('Title not specified')
    }
    if(typeof req.body.price !== 'string'|| req.body.price.trim() === '' || parseInt(req.body.price) <= 0){
        return res.send('Price is not valid')
    }
    if(typeof req.body.category !== 'string' || req.body.category.trim() === ''){
        return res.send('Category not specified')
    }
    if(typeof req.body.description !== 'string' || req.body.description.trim() === ''){
        return res.send('Description not specified')
    }
    if(req.body.description.length < 6){
        return res.send('Description too short')
    }
    await Product.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    res.redirect('/edit-product/'+req.params.id)
}

exports.getCategories = async (req,res)=>{
    const categories = await productCategory.findAll();
    res.render('product-category',{
        categories: categories
    });
}
exports.createCategory = async (req,res)=>{
    try{
        if(typeof req.body.categoryName !== 'string' || req.body.categoryName.trim() === ''){
            return res.send('Category name not valid');
        }
        let existingCategory = await productCategory.findOne({
            where: {
                name: req.body.categoryName
            }
        });
        if(existingCategory != null){
            return res.send('Category already exists');
        }
        await productCategory.create({
            name: req.body.categoryName
        });
        res.redirect('/categories');
    }catch(err){
        res.send(err.message);
    }
}

exports.editCategory = async (req,res)=>{
    try{
        if(typeof req.body.categoryName !== 'string' || req.body.categoryName.trim() === ''){
            return res.send('Category name not valid');
        }
        if(+req.body.categoryId < 1){
            return res.send('Category ID not valid');
        }
        let existingCategory = await productCategory.findOne({
            where: {
                id: req.body.categoryId
            }
        });
        if(existingCategory == null){
            return res.send('Category does not exist');
        }
        await existingCategory.update({
            name: req.body.categoryName
        });
        res.redirect('/categories');
    }catch(err){
        res.send(err.message);
    }
}

exports.deleteCategory = async(req,res)=>{
    try{
        let category = await productCategory.findOne({
            where: {
                id: req.params.id
            }
        });
        if(category == null){
            return res.send('Category not found');
        }
        await category.destroy();
        res.redirect('/categories');
    }catch(err){
        res.send(err.message);
    }
}

exports.deleteProduct = async (req, res)=>{
    try{
        let product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        if(product == null){
            res.send('Product not found');
            return;
        }
        await product.destroy();
        res.redirect('/');
    }catch (err){
        res.send(err.message);
    }
}
exports.addToCart = async (req,res)=>{
    try{
        let id = req.params.id;
        let product = await Product.findOne({
            where: {
                id: id
            }
        });
        if(product == null){
            return res.send('Product does not exist');
        }
        let productCart = await Cart.findOne({
            where: {
                productId: product.id
            }
        });
        if(productCart == null){
            await Cart.create({
                productId: product.id,
                quantity: 1
            });
        }else{
            await productCart.update({
                quantity: +productCart.quantity + 1
            })
        }
        res.redirect('/');
    }catch(err){
        res.send(err.message);
    }
}