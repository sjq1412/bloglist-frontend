import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import "./index.css"

const storageLoggedUserKey = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, variant: null })

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

  return (
    <div>
      <Notification message={notification?.message} variant={notification?.variant} />
      {!user && <LoginForm setUser={setUser} setNotification={setNotification} />}
      {
        user && <div>
          <h2>blogs</h2>
          <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
          <BlogForm setBlogs={setBlogs} setNotification={setNotification} />
          <Blogs blogs={blogs} />
        </div> 
      }
    </div>
  )
}

export default App