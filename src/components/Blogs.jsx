import React from 'react';
import { useSelector } from 'react-redux';

import Blog from './Blog';

const Blogs = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = [...blogs].sort(
    (a, b) => (b.likes || 0) - (a.likes || 0),
  );

  return (
    <div className="blogList">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default Blogs;
