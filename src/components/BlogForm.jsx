import React, {useState} from 'react'
import blogService from "../services/blogs"

const BlogForm = ({ setBlogs, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    console.log({title, author, url})

    try {
        if (!title || !author || !url) {
            setNotification({message: 'Please complete all fields', variant: 'error'})
        } else {
            const newBlog = await blogService.create({title, author, url})
            setBlogs(blogs => blogs.concat(newBlog))
            setNotification({message: `a new blog ${newBlog.title} by ${newBlog.author} added`, variant: 'success'})
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    } catch (exception) {
        console.error({exception})
        setNotification({ message: exception.message, variant: 'error' })
    }
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
            <div>
                title:
                <input
                    type="text"
                    name='title'
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    name='author'
                    value={author}
                    onChange={({target}) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    name='url'
                    value={url}
                    onChange={({target}) => setUrl(target.value)}
                />
            </div>
            <button type='submit' >create</button>
        </form>
    </div>
  )
}

export default BlogForm