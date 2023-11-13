import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setNotification } from './reducers/notificationReducer';

import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import './index.css';

const storageLoggedUserKey = 'loggedBlogappUser';

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
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
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem(storageLoggedUserKey);
    setUser(null);
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      if (!blogObject.title || !blogObject.author || !blogObject.url) {
        dispatch(
          setNotification({
            message: 'Please complete all fields',
            variant: 'error',
          }),
        );
      } else {
        const newBlog = await blogService.create(blogObject);
        setBlogs((blogs) => blogs.concat(newBlog));
        dispatch(
          setNotification({
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            variant: 'success',
          }),
        );
        blogFormRef.current.toggleVisibility();
      }
    } catch (error) {
      console.error({ error });
      if (error.response.status === 401) {
        window.localStorage.removeItem(storageLoggedUserKey);
        setUser(null);
      }
      dispatch(
        setNotification({
          message: error.response.data.error,
          variant: 'error',
        }),
      );
    }
  };

  const handleLike = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id);
      if (!blog) {
        dispatch(
          setNotification({ message: 'Blog not found', variant: 'error' }),
        );
      } else {
        const blogObject = {
          author: blog.author,
          title: blog.title,
          url: blog.url,
          likes: (blog?.likes || 0) + 1,
          user: blog?.user?.id,
        };
        const updatedBlog = await blogService.update(id, blogObject);
        setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
      }
    } catch (error) {
      console.error({ error });
      dispatch(
        setNotification({
          message: error.response.data.error,
          variant: 'error',
        }),
      );
    }
  };

  const handleRemove = async (blogToRemove) => {
    try {
      await blogService.remove(blogToRemove.id);
      setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
      dispatch(
        setNotification({
          message: `Successfully removed ${blogToRemove.title} by ${blogToRemove.author}`,
          variant: 'success',
        }),
      );
    } catch (error) {
      console.error({ error });
      dispatch(
        setNotification({
          message: error.response.data.error,
          variant: 'error',
        }),
      );
    }
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
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          <Blogs
            blogs={blogs}
            like={handleLike}
            remove={handleRemove}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
