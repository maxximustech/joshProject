const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')

router.get('/create-product',productController.newProductPage)

router.post('/product',productController.createNewProduct)

router.get('/product/:id',productController.singleProductPage)

router.get('/edit-product/:id',productController.editProductPage)

router.post('/edit-product/:id',productController.updateProduct)

router.get ('/search', productController.searchProductPage)

router.get('/jquery',(req,res)=>{
    res.render('jquery');
});

router.get('/categories',productController.getCategories);
router.post('/create-category',productController.createCategory);

router.post('/edit-category',productController.editCategory);
router.get('/delete-category/:id',productController.deleteCategory);
router.get('/delete-product/:id',productController.deleteProduct);
router.get('/add-to-cart/:id',productController.addToCart);

module.exports = router