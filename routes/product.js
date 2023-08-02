const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')

router.get('/create-product',productController.newProductPage)

router.post('/product',productController.createNewProduct)

router.get('/product/:id',productController.singleProductPage)

router.get('/edit-product/:id',productController.editProductPage)

router.post('/edit-product/:id',productController.updateProduct)

module.exports = router