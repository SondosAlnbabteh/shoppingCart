import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { loadCart } from './cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

// Subscribe to store updates to save the cart to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart.items));
});

// Load cart data from localStorage
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  store.dispatch(loadCart(JSON.parse(savedCart)));
}

export default store;
