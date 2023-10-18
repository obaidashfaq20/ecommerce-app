import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTS_URL } from "../../constants/constant";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'idle',
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'successful';
        state.products = action.payload;
        state.errors = null;

      })
      .addCase(fetchProducts.rejected, (state, {error}) => {
        state.status = 'failed';
        state.errors = error.message;
      })
  },
})

export default productSlice.reducer;

// Create an async thunk for fetching projects
export const fetchProducts = createAsyncThunk('products/fetchProducts', async(token) => {
  const response = await axios.get(PRODUCTS_URL,{
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
})

const postProduct = async(product, token) => {
  var data = JSON.stringify({ product });
  var config = {
    method: 'post',
    url: PRODUCTS_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data : data
  };
  await axios(config);
}
