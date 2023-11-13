import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import './index.css';
import { initializeBlogs } from './reducers/blogReducer';

const storageLoggedUserKey = 'loggedBlogappUser';

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

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
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              blogFormRef={blogFormRef}
              setUser={setUser}
              storageLoggedUserKey={storageLoggedUserKey}
            />
          </Togglable>
          <Blogs user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
