import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice";
import productReducer from "../Features/ProductSlice";
import cartReducer from "../Features/CartSlice";
const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
