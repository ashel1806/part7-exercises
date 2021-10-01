import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        title:
        <input
          id="title"
          value={newTitle}
          onChange={handleTitleChange}
        />
        <br/>
        author:
        <input
          id="author"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <br/>
        url:
        <input
          id="url"
          value={newUrl}
          onChange={handleUrlChange}
        />
        <br/>
        <button id="create-blog" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm