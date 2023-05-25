import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import categoryReducer from "./categories/categoriesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  categories: categoryReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart"], // persist edilecek reducer'ları belirtin
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
