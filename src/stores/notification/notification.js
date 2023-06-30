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
    setAllOfSeenTrue: (state) => {
      state.notificationData = state.notificationData.map((notification) => ({
        ...notification,
        seen: true,
      }));
    },
  },
});

export const { fetchNotificationData, setAllOfSeenTrue } =
  notificationSlice.actions;
export default notificationSlice.reducer;
