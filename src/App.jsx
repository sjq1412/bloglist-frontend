import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

import AppRoutes from './AppRoutes';

import './index.css';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { getStorageUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getStorageUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }
  }, [dispatch, user]);

  return (
    <div>
      <nav className="nav">
        {user && (
          <div className="nav-profile">
            {user.name} logged in{' '}
            <Tooltip title="logout">
              <IconButton
                variant="contained"
                size="small"
                onClick={() => dispatch(logoutUser())}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </nav>
      <Notification />
      {!user && <LoginForm />}
      <br />
      {user && <AppRoutes />}
    </div>
  );
};

export default App;
