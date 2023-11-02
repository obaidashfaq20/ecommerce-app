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
      // Fetch product promise
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

      // add product promise
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'successful';
        const product = action.payload;
        state.products.push(product);
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

      // delete product promise
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { product_id } = action.payload;
        state.products = state.products.filter(product => product.id !== product_id)
      })

      // edit product promise
      .addCase(editProduct.fulfilled, (state, action) => {
        const product = action.payload;
        console.log(product)
      })
      .addCase(editProduct.rejected, (state, error) => {
        console.log(error)
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

// Create an async thunk for editing a product
export const editProduct = createAsyncThunk(
  'product/editProduct',
  async(object) => {
    const { id, product, token } = object;
    const data = JSON.stringify({ product });
    const config = {
      method: 'patch',
      url: `${PRODUCTS_URL}/${id}`,
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

// Create an async thunk for deleting products
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async(object) => {
    const { product_id, token } = object;
    const response = await axios.delete(`${PRODUCTS_URL}/${product_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return {response: response.data, product_id: product_id};
  }
)