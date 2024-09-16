import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    updateItem(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(i => i.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    },
    loadCart(state, action) {
      state.items = action.payload;

    }
  }
});

export const { addItem, updateItem, removeItem, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
