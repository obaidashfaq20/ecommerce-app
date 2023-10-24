import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    showNotificationCopiedModal: false,
  },
  reducers: {
    setShowNofificationCopiedModal: (state, action) => {
      state.showNotificationCopiedModal = action.payload;
    }
  }
});


export const { setShowNofificationCopiedModal } = settingSlice.actions;
export default settingSlice.reducer;