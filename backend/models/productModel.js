const knex = require('knex')(require('../knexfile').development);

// Fetch all products
const getAllProducts = () => {
  return knex('products').select('*');
};

// Fetch a single product by ID
const getProductById = (id) => {
  return knex('products').where({ id }).first();
};

// Add a new product
const addProduct = (productData) => {
  return knex('products').insert(productData).returning('*');
};

// Update a product
const updateProduct = (id, updatedData) => {
  return knex('products').where({ id }).update(updatedData).returning('*');
};

// Delete a product
const deleteProduct = (id) => {
  return knex('products').where({ id }).del();
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
