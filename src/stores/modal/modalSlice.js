import { createSlice } from "@reduxjs/toolkit";

// Slice'ı oluşturun
const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    openModal: (state) => true,
    closeModal: (state) => false,
  },
});

// Slice'ın eylemlerini ve reducer'ını dışa aktarın
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
