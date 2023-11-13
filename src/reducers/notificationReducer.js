import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null, // {message: '', type: 'success/error'}
  reducers: {
    setNotification(state, action) {
      const notification = action.payload;
      return notification;
    },
    resetNotification(state, action) {
      return null;
    },
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
