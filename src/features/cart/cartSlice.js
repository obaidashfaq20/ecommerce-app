import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CART_ITEMS_URL } from "../../constants/constant";

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
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, state => {
        console.log('Get cart items');
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        let items = action.payload
        state.items = items;
      })
      .addCase(getCartItems.rejected, (state, error) => {
        console.log(error);
      })
  }
});

export const getCartItems = createAsyncThunk(
  'cart/cart_items',
  async(token) => {
    const response = await axios.get(CART_ITEMS_URL, {
      headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
  }
);

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
