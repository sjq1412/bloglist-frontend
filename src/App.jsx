import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

import BlogPage from './pages/BlogPage';

import './index.css';
import { initializeBlogs } from './reducers/blogReducer';

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
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
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
                <BlogPage
                  user={user}
                  setUser={setUser}
                  storageLoggedUserKey={storageLoggedUserKey}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
