import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

import BlogsPage from './pages/BlogsPage';
import BlogPage from './pages/BlogPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';

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
      <Notification />
      {!user && <LoginForm />}
      <br />
      {user && (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in{' '}
            <button onClick={() => dispatch(logoutUser())}>logout</button>
          </div>
          <br />
          <Routes>
            <Route path="/" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
