import React, { useState } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { Create as CreateIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { setNotification } from '../reducers/notificationReducer';
import { logoutUser } from '../reducers/userReducer';
import { createBlog } from '../reducers/blogReducer';

const fieldStyle = {
  marginTop: 2,
  marginBottom: 2,
  display: 'block',
};

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
      <Typography variant="h4">create new</Typography>
      <form noValidate autoComplete="off" onSubmit={handleCreateBlog}>
        <div>
          <TextField
            label="title"
            color="secondary"
            placeholder="title"
            fullWidth
            required
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            sx={fieldStyle}
          />
        </div>
        <div>
          <TextField
            label="author"
            color="secondary"
            placeholder="author"
            fullWidth
            required
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            sx={fieldStyle}
          />
        </div>
        <div>
          <TextField
            label="url"
            color="secondary"
            placeholder="url"
            fullWidth
            required
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            sx={fieldStyle}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          id="create-blog-button"
          type="submit"
          size="large"
          endIcon={<CreateIcon />}
          sx={{ mb: 2 }}
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
