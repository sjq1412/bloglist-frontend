import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <div>
      <h3>comments</h3>
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
