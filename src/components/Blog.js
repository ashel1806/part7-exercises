import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../actions/blogs'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const users = useSelector(state => state.users)
  
  if (!blog) return null

  const increaseLikes = () => {
    dispatch(likeBlog(blog.id, blog))
  }

  const deletingBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      history.push('/')
    }
  }

  const blogOwner = users.find(u => u.username === blog.user.username)
  console.log(blogOwner)

  return (
    <div>
      <h3>{blog.title} {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={increaseLikes}>likes</button>
      </p>
      <span>added by {blog.user.name}</span>
      { blogOwner && <button onClick={deletingBlog}>delete</button> }
    </div>
  )
}

export default Blog
