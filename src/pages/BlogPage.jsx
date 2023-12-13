import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Button } from '@mui/material';
import { setNotification } from '../reducers/notificationReducer';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

import Comments from '../components/Comments';

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );

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
        navigate('/');
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

  if (!blog) return <Typography color="error">Blog not found</Typography>;

  return (
    <div>
      <Typography variant="h4" color="primary">
        {blog.title} {blog.author}
      </Typography>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        likes <span className="likes">{blog.likes || 0}</span>{' '}
        <Button
          variant="contained"
          color="secondary"
          className="likeButton"
          onClick={() => handleLike(blog.id)}
        >
          like
        </Button>
      </div>
      {blog?.user && (
        <Typography variant="caption" color="info">
          added by {blog?.user?.name}
        </Typography>
      )}
      <br />
      {blog.user && user.username === blog.user?.username && (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => handleRemove(blog)}
        >
          remove
        </Button>
      )}
      <br />
      <Comments blog={blog} />
    </div>
  );
};

export default BlogPage;
