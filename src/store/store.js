import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/slices/productSlice'
import authReducer from '../features/slices/authSlice'
import adminReducer from '../features/slices/adminSlice.js'
import userReducer from '../features/slices/userSlice.js'
import chatReducer from '../features/slices/chatSlice.js'
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    admin: adminReducer,
    user: userReducer,
    chat: chatReducer
  },
});