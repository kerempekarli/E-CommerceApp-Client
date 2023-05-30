// likeActions.js

import axios from "axios";
import Cookies from "js-cookie";
export const addLike = (productId, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      `http://localhost:3232/products/${productId}/like`,
      null,
      config
    );
    dispatch({
      type: "ADD_LIKE",
      payload: productId,
    });
  } catch (error) {
    console.error(error);
  }
};
export const removeLike = (productId, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      `http://localhost:3232/products/${productId}/like`,
      null,
      config
    );
    dispatch({
      type: "REMOVE_LIKE",
      payload: productId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchLikedProducts = () => async (dispatch) => {
  try {
    const token1 = Cookies.get("token");
    const response = await axios.get(`http://localhost:3232/products/likes`, {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    });
    const likedProducts = response.data;

    dispatch({
      type: "SET_LIKED_PRODUCTS",
      payload: likedProducts,
    });
  } catch (error) {
    console.error(error);
  }
};
