import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../actions/login'
import { setNotification } from '../actions/notification'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = e => { setUsername(e.target.value) }
  const handlePassword = e => { setPassword(e.target.value) }

  const handleSubmit = e => {
    e.preventDefault()

    try {
      dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
    } catch (ex) {
      dispatch(setNotification('wrong username or password'), 5)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={handleUsername}
          autoComplete="username"
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
          autoComplete="current-password"
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm

/*LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}*/
