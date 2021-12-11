import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { registerUser } from '../actions/users'
import { setNotification } from '../actions/notification'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = e => { setUsername(e.target.value) }
  const handleName = e => { setName(e.target.value) }
  const handlePassword = e => { setPassword(e.target.value) }

  const handleSubmit = e => {
    e.preventDefault()

    try {
      dispatch(registerUser({ username, name, password }))
      setUsername('')
      setName('')
      setPassword('')
      dispatch(setNotification('user registered succesfull'))
      history.push('/')
    } catch (e) {
      dispatch(setNotification('un campo es incorrecto o vacío', 5))
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
        name
        <input
          id='name'
          type="text"
          value={name}
          name="Name"
          onChange={handleName}
          autoComplete="name"
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
      <button id="register-button" type="submit">register</button>
    </form>
  )
}

export default RegisterForm
