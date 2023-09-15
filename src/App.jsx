import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import "./index.css"

const storageLoggedUserKey = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, variant: null })
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem(storageLoggedUserKey)
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.getToken(user.token)
    }
  }, [])

  useEffect(() => {
    const clearNotification = () => setTimeout(() => {
      setNotification(null)
    }, 3000);
    
    if (notification) {
      clearNotification()
    }
    return () => {
      clearTimeout(clearNotification)
    }
  }, [notification])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem(storageLoggedUserKey)
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
        if (!blogObject.title || !blogObject.author || !blogObject.url) {
            setNotification({message: 'Please complete all fields', variant: 'error'})
        } else {
            const newBlog = await blogService.create(blogObject)
            setBlogs(blogs => blogs.concat(newBlog))
            setNotification({message: `a new blog ${newBlog.title} by ${newBlog.author} added`, variant: 'success'})
            blogFormRef.current.toggleVisibility()
        }
    } catch (exception) {
        console.error({exception})
        setNotification({ message: exception.message, variant: 'error' })
    }
  }

  return (
    <div>
      <Notification message={notification?.message} variant={notification?.variant} />
      {!user && <LoginForm setUser={setUser} setNotification={setNotification} />}
      <br />
      {
        user && <div>
          <h2>blogs</h2>
          <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
          <br />
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          <Blogs blogs={blogs} />
        </div> 
      }
    </div>
  )
}

export default App