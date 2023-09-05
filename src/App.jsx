import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, variant: null })

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

  return (
    <div>
      <Notification message={notification?.message} variant={notification?.variant} />
      {!user && <LoginForm setUser={setUser} setNotification={setNotification} />}
      {
        user && <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div> 
      }
    </div>
  )
}

export default App