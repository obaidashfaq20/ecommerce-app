import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSice";
import settingReducer from "./features/setting/settingSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    setting: settingReducer
  },
}); 