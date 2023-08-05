const productModel = require('../models/product')

exports.getAllProducts = (req,res)=>{
    let productData = productModel.fetchAll()
    res.render('index',{products: productData})
}

exports.newProductPage = (req,res)=>{
    res.render('new-product')
}

exports.singleProductPage = (req,res)=>{
    let product = productModel.fetchOne(req.params.id)
    res.render('single-product',{product: product})
}

exports.searchProductPage = (req,res)=>{
    res.send('This is a search page')
}

exports.editProductPage = (req,res)=>{
    let product = productModel.fetchOne(req.params.id)
    res.render('edit-product',{product: product})
}

exports.createNewProduct = (req,res)=>{
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
    let newProduct = new productModel(null,req.body)
    newProduct.save()
    res.redirect('/create-product')
}

exports.updateProduct = (req,res)=>{
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
    let existingProduct = new productModel(req.params.id,req.body)
    existingProduct.save()
    res.redirect('/edit-product/'+req.params.id)
}