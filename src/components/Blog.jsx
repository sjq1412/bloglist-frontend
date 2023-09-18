import { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? ''  : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      remove(blog)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className='blogDetails'>
        <div>{blog.url}</div>
        <div>likes <span className='likes'>{blog.likes || 0}</span> <button className='likeButton' onClick={() => like(blog.id)}>like</button></div>
        {
          blog?.user && <div>
            {blog.user.name}
          </div>
        }
        {user.username === blog.user?.username && <button onClick={() => handleRemove(blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog