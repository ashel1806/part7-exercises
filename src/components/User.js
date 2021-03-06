import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)

  if(!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      {
        user.blogs.map(blog =>
          <li key={blog.title}>{blog.title}</li>
        )
      }
    </div>
  )
}

export default User
