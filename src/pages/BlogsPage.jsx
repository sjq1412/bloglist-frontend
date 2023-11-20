import React, { useRef } from 'react';

import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import Blogs from '../components/Blogs';

const BlogsPage = () => {
  const blogFormRef = useRef();

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Blogs />
    </>
  );
};

export default BlogsPage;
