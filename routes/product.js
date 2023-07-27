const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.get('/create-product',(req,res)=>{
	res.render('new-product')
})

router.post('/product',(req,res)=>{
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
	fs.readFile('products.json',(err,data)=>{
		let existingProducts = []
		if(!err){
			existingProducts = JSON.parse(data)
		}
		existingProducts.unshift({
			...req.body,
			id: Date.now(),
		})
		fs.writeFileSync('products.json',JSON.stringify(existingProducts))
		res.redirect('/create-product')
	})
})

router.get('/product/:id',(req,res)=>{
	fs.readFile('products.json',(err,data)=>{
		if(err){
			res.send('An error occurred!');
			return;
		}
		let products = JSON.parse(data);
		let product = products.find(function(item){
			return +item.id === +req.params.id
		})
		if(product == null){
			return res.send('No Product Found')
		}
		res.render('single-product',{product: product})
		console.log('Final destination')
	})
	console.log('Reached here')
})

router.get('/edit-product/:id',(req,res)=>{
	fs.readFile('products.json',(err,data)=>{
		if(err){
			res.send('An error occurred!');
			return;
		}
		let products = JSON.parse(data);
		let product = products.find(function(item){
			return +item.id === +req.params.id
		})
		if(product == null){
			return res.send('No Product Found')
		}
		res.render('edit-product',{product: product})
	})
})

router.post('/edit-product/:id',(req,res)=>{
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
	fs.readFile('products.json',(err,data)=>{
		let existingProducts = []
		if(!err){
			existingProducts = JSON.parse(data)
		}
		let productDataIndex = existingProducts.findIndex((product)=>{
			return +product.id === +req.params.id
		})
		if(productDataIndex < 0){
			return res.send('Page Not Found')
		}
		existingProducts[productDataIndex] = {
			...req.body,
			id: req.params.id
		}
		fs.writeFileSync('products.json',JSON.stringify(existingProducts))
		res.redirect('/edit-product/'+req.params.id)
	})
})

module.exports = router