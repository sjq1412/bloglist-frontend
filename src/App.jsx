import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import usersService from './services/users';

import BlogsPage from './pages/BlogsPage';
import UsersPage from './pages/UsersPage';

import './index.css';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';

const storageLoggedUserKey = 'loggedBlogappUser';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem(storageLoggedUserKey);
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.getToken(user.token);
      usersService.getToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogout = () => {
    window.localStorage.removeItem(storageLoggedUserKey);
    setUser(null);
  };

  return (
    <div>
      <Notification />
      {!user && <LoginForm setUser={setUser} />}
      <br />
      {user && (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <Routes>
            <Route
              path="/"
              element={
                <BlogsPage
                  user={user}
                  setUser={setUser}
                  storageLoggedUserKey={storageLoggedUserKey}
                />
              }
            />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
