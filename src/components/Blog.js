import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog, commentBlog } from '../actions/blogs'
import CommentForm from './CommentForm'

import Comments from './Comments'

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

  const handleComment = (comment) => {
    dispatch(commentBlog(id, comment))
  }

  const blogOwner = users.find(u => u.username === blog.user.username)
  console.log(blogOwner)

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={increaseLikes}>likes</button>
      </p>
      <span>added by {blog.user.name}</span>
      { blogOwner && <button onClick={deletingBlog}>delete</button> }

      <Comments comments={blog.comments}>
        <CommentForm
          handleComment={handleComment}
        />
      </Comments>
    </div>
  )
}

export default Blog