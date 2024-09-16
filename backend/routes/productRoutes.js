const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Fetch all products
router.get('/getAllProducts', productController.getAllProducts);

// Fetch a single product by ID
router.get('/getProductById/:id', productController.getProductById);

// Add a new product
router.post('/addProduct', productController.addProduct);

// Update a product
router.put('/updateProduct/:id', productController.updateProduct);

// Delete a product
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;
