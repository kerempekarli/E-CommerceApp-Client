import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setToCart: (state, action) => {
      const products = action.payload;
      return [...products];
    },
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.find((p) => p.id === product.id);

      if (existingProduct) {
        // Ürün zaten sepete ekli ise sadece sayısını artırın
        existingProduct.quantity += 1;
      } else {
        // Ürün daha önce sepete eklenmemişse sepete yeni ürün olarak ekleyin
        state.push({
          product_id: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
        });
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.findIndex(
        (p) => p.product_id === product.id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state[existingProductIndex];
        existingProduct.quantity -= 1;

        if (existingProduct.quantity === 0) {
          // Ürünün miktarı sıfırsa, listeden silin
          state.splice(existingProductIndex, 1);
        }
      }
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart, setToCart } =
  cartSlice.actions;

export default cartSlice.reducer;
