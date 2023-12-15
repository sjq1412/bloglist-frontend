import React from 'react';
import { useSelector } from 'react-redux';
import Masonry from 'react-masonry-css';

import Blog from './Blog';

const Blogs = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = [...blogs].sort(
    (a, b) => (b.likes || 0) - (a.likes || 0),
  );

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="blogList">
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {sortedBlogs.map((blog) => (
          <div key={blog.id}>
            <Blog blog={blog} user={user} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Blogs;
