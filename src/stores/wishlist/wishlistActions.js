import axios from "axios";
import Cookies from "js-cookie";
import { SET_WISHLIST } from "../wishlist/wishlistSlice";

export const addToWishlist = (productId) => async (dispatch) => {
  try {
    const token = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      "http://localhost:3232/wishlist/add-item",
      {
        product_id: productId,
      },
      config
    );

    dispatch(fetchWishlist());
  } catch (error) {
    console.error(error);
  }
};

export const removeFromWishlist = (productId) => async (dispatch) => {
  try {
    const token = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        product_id: productId,
      },
    };

    await axios.delete("http://localhost:3232/wishlist/delete-item", config);

    dispatch(fetchWishlist());
  } catch (error) {
    console.error(error);
  }
};

export const fetchWishlist = () => async (dispatch) => {
  try {
    const token = Cookies.get("token");
    console.log("BURASI ÇALIŞTIIIIIIIIIIIIIIIIIIIIII");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "http://localhost:3232/wishlist/getall",
      config
    );
    const wishlist = response.data;
    dispatch(SET_WISHLIST(wishlist));
  } catch (error) {
    console.error(error);
  }
};
