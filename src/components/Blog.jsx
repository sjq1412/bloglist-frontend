import { useState } from "react"

const Blog = ({ blog, like }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = {display: visible ? ''  : 'none'}

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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes || 0} <button onClick={() => like(blog.id)}>like</button></div>
        {
          blog?.user && <div>
            {blog.user.name}
          </div>
        }
      </div>
    </div>  
  )
}

export default Blog