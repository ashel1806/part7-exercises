import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from "react-router-dom"

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'

import './index.css'

import { createBlog, initializeBlogs } from './actions/blogs'
import { logout } from './actions/login'
import { setNotification } from './actions/notification'
import { initializeUsers } from './actions/users'

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const { isLoggedIn, user } = useSelector(state => state.login)

  console.log(users)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleCreateBlog = async blog => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author}`, 5))
  }

  const handleLogOut = () => {
    dispatch(logout())
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm />
    </Togglable>
  )

  if(!isLoggedIn) {
    return(
      <div>
        <h2>log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  const navBar = {
    magrin: 10,
    padding: 10,
    backgroundColor: 'lightgray'
  }

  const padding = {
    padding: 5
  }

  return(
    <Router>
      <div style={navBar}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span>
          {user.name} logged in <button onClick={handleLogOut}>logout</button>
        </span>
      </div>

      <h2>blog app</h2>

      <Notification />

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm  newBlog={handleCreateBlog} />
          </Togglable>
          <Blogs />
        </Route>
      </Switch>
    </Router>
  )

}

export default App
