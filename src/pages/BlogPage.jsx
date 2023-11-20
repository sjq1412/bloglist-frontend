import React, { useRef } from 'react';

import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import Blogs from '../components/Blogs';

const BlogPage = ({ user, setUser, storageLoggedUserKey }) => {
  const blogFormRef = useRef();

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          blogFormRef={blogFormRef}
          setUser={setUser}
          storageLoggedUserKey={storageLoggedUserKey}
        />
      </Togglable>
      <Blogs user={user} />
    </>
  );
};

export default BlogPage;
