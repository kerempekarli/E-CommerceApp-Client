import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import thunk from "redux-thunk";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [thunk],
});

export default store;
