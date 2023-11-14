import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_TO_CART, CART_ITEMS_URL, REMOVE_CART_ITEMS_URL } from "../../constants/constant";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {},
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
      .addCase(removeCartItem.pending, state => {
        console.log('remove item from cart')
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const { product_id } = action.payload;
        state.items = state.items.filter(product => product.id !== product_id)
      })
      .addCase(removeCartItem.rejected, (state, error) => {
        console.log('error in removing from the cart')
      })
      .addCase(addToCart.pending, state => {
        console.log('adding to cart')
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        let { product } = action.payload;
        state.items.push(product)
      })
      .addCase(addToCart.rejected, (state, error) => {
        console.log({error})
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

export const removeCartItem = createAsyncThunk(
  'cart/delete_cart_item',
  async(object) => {
    const { product_id, token } = object;
    const response = await axios.delete(`${REMOVE_CART_ITEMS_URL}/${product_id}`, {
      headers: { Authorization: `Bearer ${token}`}
    });
    return {response: response.data, product_id: product_id};
  }
);

export const addToCart = createAsyncThunk(
  'cart/add_item',
  async(object) => {
    const { product, token } = object;
    var data = JSON.stringify( product.id );
    var config = {
      method: 'post',
      url: `${ADD_TO_CART}/${product.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };
    const response = await axios(config);
    return { response: response.data, product: product };
  }
);

export default cartSlice.reducer;
