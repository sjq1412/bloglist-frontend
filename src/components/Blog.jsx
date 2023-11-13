import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNotification } from '../reducers/notificationReducer';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id);
      if (!blog) {
        dispatch(
          setNotification({ message: 'Blog not found', variant: 'error' }),
        );
      } else {
        dispatch(likeBlog(id, blog));
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

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id));
        dispatch(
          setNotification({
            message: `Successfully removed ${blog.title} by ${blog.author}`,
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
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className="blogDetails">
        <div>{blog.url}</div>
        <div>
          likes <span className="likes">{blog.likes || 0}</span>{' '}
          <button className="likeButton" onClick={() => handleLike(blog.id)}>
            like
          </button>
        </div>
        {blog?.user && <div>{blog.user.name}</div>}
        {blog.user && user.username === blog.user?.username && (
          <button onClick={() => handleRemove(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
