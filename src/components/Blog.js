import React, { useState } from 'react'

const Blog = ({
  blog,
  increaseLikes,
  deleteBlog
}) => {
  const [blogvisible, setBlogVisible] = useState(false)

  const hideWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWith: 1,
    marginBottom: 5,
    display: blogvisible ? 'none' : ''
  }

  const showWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWith: 1,
    marginBottom: 5,
    display: blogvisible ? '' : 'none'
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className="blogView">
        <span>{blog.title} {blog.author}</span>
        <button onClick={() => setBlogVisible(false)}>hide</button>
        <p className="blogUrl">{blog.url}</p>
        likes <span className="blogLikes">{blog.likes}</span>
        <button onClick={increaseLikes}>like</button>
        <p>{blog.user.name}</p>
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
