import { addToCart, removeFromCart, clearCart, setToCart } from "./cartSlice";
import Cookies from "js-cookie";
import axios from "axios";
export const addToCartAsync = (product) => {
  return async (dispatch) => {
    try {
      const productfix = { ...product, product_id: product.id };
      console.log("productfix ", productfix);
      console.log(product);
      const token = Cookies.get("token");
      const response = await axios.post(
        `http://localhost:3232/products/${product.id}/add-to-cart`,
        {
          seller_id: product.seller_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response;
      if (data.status === 200) {
        dispatch(addToCart(productfix));
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
      console.log("Karttan silme işlemi çalıştı");
      const productfix = { ...product, product_id: product.id };
      console.log("PRODUCTFIX", productfix);
      const token = Cookies.get("token");
      await fetch(
        `http://localhost:3232/products/${product.id}/decrease-cart-item-quantity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Bu örnekte, direkt olarak removeFromCart eylemini tetikliyoruz
      dispatch(removeFromCart(productfix));
    } catch (error) {
      // Hata yönetimi
      console.log("ERROR SEBEB ", error);
      console.error("Error:", error);
    }
  };
};

export const clearCartAction = () => {
  return (dispatch) => {
    dispatch(clearCart());
  };
};
export const setToCartAction = () => async (dispatch) => {
  try {
    const token = Cookies.get("token"); // Replace with your actual bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get("http://localhost:3232/cart", config);
    const items = response.data;

    dispatch(setToCart(items));
  } catch (error) {
    console.error(error);
  }
};
