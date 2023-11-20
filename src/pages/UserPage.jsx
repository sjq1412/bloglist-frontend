import React from 'react';
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
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.length ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        'User has no blogs'
      )}
    </div>
  );
};

export default UserPage;
