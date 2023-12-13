import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from '@mui/material';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <div>
      <Typography variant="h5" color="secondary" gutterBottom>
        comments
      </Typography>
      <CommentForm id={blog.id} blog={blog} />
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={uuidv4()}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
