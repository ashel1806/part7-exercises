import {
  GET_USERS,
  REGISTER_USER
} from './types'

import userServices from '../services/users'
import registerService from '../services/register'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userServices.getAll()

    dispatch({
      type: GET_USERS,
      data: users
    })
  }
}

export const registerUser = credentials => {
  return async dispatch => {
    const newUser = await registerService.register(credentials)

    dispatch({
      type: REGISTER_USER,
      data: newUser
    })
  }
}