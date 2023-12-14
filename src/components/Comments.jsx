import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Typography, Box, Grid } from '@mui/material';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <CommentForm id={blog.id} blog={blog} />
      <Grid container>
        <ul>
          {blog.comments.map((comment) => (
            <Grid key={uuidv4()} item xs={12}>
              <li>
                <Typography>{comment}</Typography>
              </li>
            </Grid>
          ))}
        </ul>
      </Grid>
    </Box>
  );
};

export default Comments;
