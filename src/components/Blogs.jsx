import React from 'react';
import { Grid, Paper } from '@mui/material';
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
      <Grid container>
        {sortedBlogs.map((blog) => (
          <Grid key={blog.id} item xs={12}>
            <Blog blog={blog} user={user} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Blogs;
