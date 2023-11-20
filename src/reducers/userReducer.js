import { createSlice } from '@reduxjs/toolkit';

import loginService from '../services/login';
import blogService from '../services/blogs';
import usersService from '../services/users';

import { setNotification } from './notificationReducer';

const storageLoggedUserKey = 'loggedBlogappUser';

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
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    } catch (exception) {
      console.error({ exception });
      dispatch(
        setNotification({
          message: 'wrong username or password',
          variant: 'error',
        }),
      );
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(storageLoggedUserKey);
    dispatch(removeUser());
  };
};

export const getStorageUser = () => {
  return async (dispatch) => {
    const loggedUser = window.localStorage.getItem(storageLoggedUserKey);
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.getToken(user.token);
      usersService.getToken(user.token);
    }
  };
};

export default userSlice.reducer;
