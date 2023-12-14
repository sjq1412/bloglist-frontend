import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { Create as CreateIcon } from '@mui/icons-material';

import { commentToBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { logoutUser } from '../reducers/userReducer';

const fieldStyle = {
  marginTop: 2,
  marginBottom: 2,
  display: 'block',
};

const CommentForm = ({ id, blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (!comment) {
        setCommentError(true);
        dispatch(
          setNotification({
            message: 'Comment must not be empty',
            variant: 'error',
          }),
        );
      } else {
        setCommentError(false);
        dispatch(commentToBlog(id, comment));
        dispatch(
          setNotification({
            message: `You have successfully commented on ${blog.title} by ${blog.author} added`,
            variant: 'success',
          }),
        );
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
    setComment('');
  };
  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          label="Comment"
          color="secondary"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="enter comment"
          sx={fieldStyle}
          required
          multiline
          rows={4}
          fullWidth
          error={commentError}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="secondary"
          endIcon={<CreateIcon />}
        >
          add comment
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
