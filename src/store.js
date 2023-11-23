import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSice";
import settingReducer from "./features/setting/settingSlice";
import cartSlice from "./features/cart/cartSlice";
import orderSlice from "./features/order/orderSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    setting: settingReducer,
    cart: cartSlice,
    order: orderSlice
  },
}); 