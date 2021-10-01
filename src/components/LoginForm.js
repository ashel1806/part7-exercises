import PropTypes from 'prop-types'
import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsername,
  handlePassword,
  username,
  password
}) => {
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
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}