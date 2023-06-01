import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    SET_WISHLIST: (state, action) => {
      const wishlist = action.payload;
      return wishlist;
    },
    ADD_TO_WISHLISTS: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((p) => p.id === product.id);
      if (existingProduct) {
        return state;
      } else {
        state.push({
          id: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
        });
      }
    },
    DELETE_FROM_WISHLIST: (state, action) => {
      const productId = action.payload;
      const updatedState = state.filter((product) => product.id !== productId);
      return updatedState;
    },
  },
});

export const { SET_WISHLIST, ADD_TO_WISHLISTS, DELETE_FROM_WISHLIST } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
