import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      state.push(product);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      return state.filter((product) => product.id !== productId);
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
