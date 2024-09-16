import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { loadCart } from './cartSlice';
import userReducer, { setUser } from './userSlice';
import productReducer from './productReducer';
import Cookies from 'js-cookie';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
  },
});

// Subscribe to store changes and persist the cart and user data in localStorage
store.subscribe(() => {
  const state = store.getState();
  
  // Store cart data
  const cartData = JSON.stringify(state.cart.items);
  localStorage.setItem('cart', cartData);
  
  // Store user data (only if user exists)
  if (state.user.user) {
    const userData = JSON.stringify(state.user.user);
    localStorage.setItem('user', userData);
  }
});

// Load saved cart from localStorage
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  store.dispatch(loadCart(JSON.parse(savedCart)));
}

// Load saved user and token from localStorage and cookies
const savedUser = localStorage.getItem('user');
const token = Cookies.get('token');

if (savedUser && token) {
  store.dispatch(setUser(JSON.parse(savedUser)));
}

export default store;
