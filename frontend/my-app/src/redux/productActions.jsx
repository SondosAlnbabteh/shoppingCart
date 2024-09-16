import axios from 'axios';
import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
} from './Actions';

// Fetch products
export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/api/products/getAllProducts');
    dispatch({ type: FETCH_PRODUCTS, payload: response.data });
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.message });
  }
};

// Add product
export const addProduct = (productData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/products/addProduct', productData);
    dispatch({ type: ADD_PRODUCT, payload: response.data });
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.message });
  }
};

// Update product
export const updateProduct = (productId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/products/updateProduct/${productId}`, updatedData);
    dispatch({ type: UPDATE_PRODUCT, payload: response.data });
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.message });
  }
};

// Delete product
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/api/products/deleteProduct/${productId}`);
    dispatch({ type: DELETE_PRODUCT, payload: productId });
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.message });
  }
};
