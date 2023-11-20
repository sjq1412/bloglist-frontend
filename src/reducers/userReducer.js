import { createSlice } from '@reduxjs/toolkit';

import loginService from '../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    dispatch(setUser(user));
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
  };
};
