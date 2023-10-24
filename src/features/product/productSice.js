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

      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'successful';
        console.log(action)
        // state.products = action.payload;
        // state.errors = null;
      })
      .addCase(addProduct.pending, state => {
        // state.status = 'loading';
        console.log('pending add product')
      })
      .addCase(addProduct.rejected, (state, {error}) => {
        console.log(error.message)
      })

  },
})

export default productSlice.reducer;

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async(token) => {
    const response = await axios.get(PRODUCTS_URL,{
      headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
  }
)

// Create an async thunk for posting product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async(object) => {
    const { product, token } = object;
    var data = JSON.stringify({ product });
    var config = {
      method: 'post',
      url: PRODUCTS_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };
    const response = await axios(config);
    return response.data;
  }
)

const postProduct = async(product, token) => {
  var data = JSON.stringify({ product });
  var config = {
    method: 'post',
    url: PRODUCTS_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: data
  };
  await axios(config);
}
