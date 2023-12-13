import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, IconButton, Tooltip } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

import Layout from './layout';
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
        <ul className="nav-list">
          <li>
            <Link to="/">blogs</Link>
          </li>
          <li>
            <Link to="/users">users</Link>
          </li>
        </ul>
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
      <Layout>
        {' '}
        <Notification />
        {!user && <LoginForm />}
        <br />
        {user && (
          <div>
            <Typography variant="h2" component="h2" color="primary">
              Blog App
            </Typography>
            <br />
            <AppRoutes />
          </div>
        )}
      </Layout>
    </div>
  );
};

export default App;
