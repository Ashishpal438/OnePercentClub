import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.symbol === item.symbol);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({...item, quantity: 1});
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.symbol !== id);
    },
    updateQuantity: (state, action) => {
      const {id, quantity} = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {addItem, removeItem, updateQuantity, clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
