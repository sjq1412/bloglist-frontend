import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { id } = useParams();

  const user = useSelector((state) =>
    state.users.find((user) => user.id === id),
  );

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <Typography color="secondary" variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        added blogs
      </Typography>
      {user.blogs.length ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <Typography color="error">User has no blogs</Typography>
      )}
    </div>
  );
};

export default UserPage;
