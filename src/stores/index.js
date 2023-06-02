import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import cartReducer from "./cart/cartSlice";
import categoryReducer from "./categories/categoriesSlice";
import likeReducer from "./likes/likeReducer";
import wishlistReducer from "./wishlist/wishlistSlice";
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  categories: categoryReducer,
  likes: likeReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart", "wishlist", "likes", "auth"], // persist edilecek reducer'ları belirtin
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
