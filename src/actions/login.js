import {
  LOGIN_APP,
  LOGOUT_APP
} from './types'

import loginService from '../services/login'

export const login = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)

    dispatch({
      type: LOGIN_APP,
      data: { user }
    })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT_APP
    })
  }
}
