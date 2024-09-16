const productModel = require('../models/productModel');

// Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getProductById(id);
    
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const createdProduct = await productModel.addProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;
    const result = await productModel.updateProduct(id, updatedProduct);

    if (result) {
      res.status(200).json({ message: 'Product updated successfully', product: result });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.deleteProduct(id);

    if (result) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
