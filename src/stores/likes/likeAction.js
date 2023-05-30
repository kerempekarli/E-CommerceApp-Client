// likeActions.js

import axios from "axios";
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
      type: "ADD_LIKE",
      payload: productId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchLikedProducts = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/users/${userId}/likedProducts`);
    const likedProducts = response.data;
    dispatch({
      type: "SET_LIKED_PRODUCTS",
      payload: likedProducts,
    });
  } catch (error) {
    console.error(error);
  }
};
