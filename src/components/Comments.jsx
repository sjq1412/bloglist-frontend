import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Comments = ({ blog }) => {
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={uuidv4()}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
