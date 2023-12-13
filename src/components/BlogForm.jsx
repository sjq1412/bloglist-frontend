import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { setNotification } from '../reducers/notificationReducer';
import { logoutUser } from '../reducers/userReducer';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
    };

    try {
      if (!blogObject.title || !blogObject.author || !blogObject.url) {
        dispatch(
          setNotification({
            message: 'Please complete all fields',
            variant: 'error',
          }),
        );
      } else {
        dispatch(createBlog(blogObject));
        dispatch(
          setNotification({
            message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
            variant: 'success',
          }),
        );
        blogFormRef.current.toggleVisibility();
      }
    } catch (error) {
      console.error({ error });
      if (error.response.status === 401) {
        dispatch(logoutUser());
      }
      dispatch(
        setNotification({
          message: error.response.data.error,
          variant: 'error',
        }),
      );
    }

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            placeholder="title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            placeholder="author"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            placeholder="url"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          id="create-blog-button"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
