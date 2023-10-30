import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      state.items.push(product)
    },
    removeFromCart: (state, action) => {
      const { product_id } = action.payload;
      const items = state.items.filter(product => product.id !== product_id);
      state.items = items;
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
