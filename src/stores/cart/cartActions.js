import { addToCart, removeFromCart, clearCart } from "./cartSlice";
import Cookies from "js-cookie";
import { setToCart } from "../cart/cartSlice";
export const addToCartAsync = (product) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:3232/products/${product.id}/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response;
      if (data.status === 200) {
        dispatch(addToCart(product));
      }
    } catch (error) {
      // Hata yönetimi
      console.log("ERROR SEBEB ", product);
      console.error("Error:", error);
    }
  };
};

export const removeFromCartAction = (product) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:3232/products/${product.id}/decrease-cart-item-quantity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Bu örnekte, direkt olarak removeFromCart eylemini tetikliyoruz
      dispatch(removeFromCart(product));
    } catch (error) {
      // Hata yönetimi
      console.log("ERROR SEBEB ", product);
      console.error("Error:", error);
    }
  };
};

export const clearCartAction = () => {
  return (dispatch) => {
    dispatch(clearCart());
  };
};
export const setToCartAction = (items) => {
  setToCart(items);
};
