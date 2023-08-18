const db = require('../database');
const Product = db.models.Product;

exports.getAllProducts = (req,res)=>{
    Product.findAll()
        .then(products=>{
            res.render('index',{products: products})
        })
        .catch(err=>{
        throw err;
    });

}

exports.newProductPage = (req,res)=>{
    res.render('new-product')
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
    await Product.create(req.body);
    res.redirect('/create-product')
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