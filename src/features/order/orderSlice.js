import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDERS_URL } from "../../constants/constant";


export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    items: []
  },
  reducers: {},
  extraReducers: (builder) =>{
    builder
      .addCase(getOrders.pending, state => {
        console.log('Fetching orders')
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        console.log('Orders Fetched')
        state.items= action.payload;
      })
      .addCase(getOrders.rejected, (state, object) => {
        console.log({object})
      })
      .addCase(createOrder.pending, state => {
        console.log('Creating order')
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log('Order created')
        console.log({action})
        state.order = action.payload
      })
      .addCase(createOrder.rejected, (state, object) => {
        console.log({object})
      })
  }
})


export const getOrders = createAsyncThunk(
  'order/getOrders',
  async(token) => {
    const response = await axios.get(ORDERS_URL, {
      headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
  }
)

export const createOrder = createAsyncThunk(
  'order/createOrders',
  async(_obj) => {
    const { token, cartItems, payment_intent_id } = _obj
    var data = JSON.stringify({ cartItems: cartItems, payment_intent_id: payment_intent_id });
    var config = {
      method: 'post',
      url: ORDERS_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    }
    const response = await axios(config);
    return response.data;
  }
)

export default orderSlice.reducer;
