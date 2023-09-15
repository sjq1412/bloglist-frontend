import React from 'react'
import Blog from './Blog'

const Blogs = ({blogs, like}) => {
  const sortedBlogs = blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0))

  return (
    <div>{sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={like} />
      )}</div>
  )
}

export default Blogs