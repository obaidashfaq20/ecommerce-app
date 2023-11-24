import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDERS_URL } from "../../constants/constant";

export const orderItemSlice = createSlice({
  name: 'orderItem',
  initialState: {
    items: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderItems.pending, state => {
        console.log('Order Items Fetching')
      })
      .addCase(getOrderItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getOrderItems.rejected, error => {
        console.log({error})
      })
  }
})

// Create an async thunk for editing a product
export const getOrderItems = createAsyncThunk(
  'order/getOrderItems',
  async(object) => {
    const { id, token } = object;
    const response = await axios.get(`${ORDERS_URL}/${id}/order_items`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
)

export default orderItemSlice.reducer;
