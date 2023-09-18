import React, { useState } from 'react'

const BlogForm = ({  createBlog  }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url
    }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ handleCreateBlog }>
        <div>
                title:
          <input
            placeholder='title'
            type="text"
            name='title'
            value={ title }
            onChange={ ({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                author:
          <input
            placeholder='author'
            type="text"
            name='author'
            value={ author }
            onChange={ ({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                url:
          <input
            placeholder='url'
            type="text"
            name='url'
            value={ url }
            onChange={ ({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type='submit' >create</button>
      </form>
    </div>
  )
}

export default BlogForm