import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import { commentToBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { logoutUser } from '../reducers/userReducer';

const CommentForm = ({ id, blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (!comment) {
        dispatch(
          setNotification({
            message: 'Comment must not be empty',
            variant: 'error',
          }),
        );
      } else {
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="enter comment"
        />
        <Button type="submit" variant="contained" size="small">
          add comment
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
