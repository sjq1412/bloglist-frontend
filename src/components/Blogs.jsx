import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, like, remove, user }) => {
  const sortedBlogs = blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0))

  return (
    <div className='blogList'>{sortedBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} like={like} remove={remove} user={user} />
    )}
    </div>
  )
}

export default Blogs