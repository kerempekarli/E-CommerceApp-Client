// likeReducer.js

const likeReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_LIKE":
      return [...state, action.payload];
    case "REMOVE_LIKE":
      return state.filter((productId) => productId !== action.payload);
    case "SET_LIKED_PRODUCTS":
      return action.payload;
    default:
      return state;
  }
};

export default likeReducer;
