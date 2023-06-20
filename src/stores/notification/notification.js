// notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationData: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    fetchNotificationData: (state, action) => {
      state.notificationData = action.payload;
    },
  },
});

export const { fetchNotificationData } = notificationSlice.actions;
export default notificationSlice.reducer;
