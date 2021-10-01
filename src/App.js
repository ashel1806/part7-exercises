import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      const returnedBlog = await blogService.create(blogObject)

      console.log(returnedBlog)

      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage(`a new blog '${blogObject.title}' by ${blogObject.author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }catch (ex) {
      console.log(ex)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (ex) {
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      // console.log(ex)
    }

    // console.log('loggin in with', username, password);
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const addLike = async (blogToUpdate) => {
    try {
      const blogToChange = blogs.find(b => b.id === blogToUpdate.id)

      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }

      console.log('blogs before changed: ', blogs)

      const updatedBlog = await blogService.update(blogToUpdate.id, changedBlog)

      setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : updatedBlog))

      console.log('blogs after chenge: ', blogs)
    } catch (ex) {
      setNotificationMessage('something failed')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const deletingBlog = async (blogToBeDelete) => {
    try {
      const blogToDelete = blogs.find(b => b.id === blogToBeDelete.id)

      if(window.confirm(`Remove ${blogToDelete.title} by ${blogToDelete.author}`)) {
        await blogService.deleteBlog(blogToDelete.id)
        setBlogs(blogs.filter(b => b.id !== blogToBeDelete.id))
      }


    }catch (ex) {
      console.log(ex)
    }
  }
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsername={({ target }) => setUsername(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    //Hacer que esto no sea visible/not-visible
    //Quitar componente Togglable y regresar a lo anterior
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if(user === null) {
    return(
      <div>
        <h2>log in to application</h2>
        <Notification message={notificationMessage} />
        {loginForm()}
      </div>
    )
  }

  return(
    <div>
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} />
        <span>{user.name} logged-in</span>
        <button onClick={handleLogOut}>logout</button>
        {blogForm()}
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            increaseLikes={() => addLike(blog)}
            deleteBlog={() => deletingBlog(blog)}
          />
        )}
      </div>
    </div>
  )

}

export default App