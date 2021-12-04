import {
  GET_USERS
} from './types'

import userServices from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userServices.getAll()

    dispatch({
      type: GET_USERS,
      data: users
    })
  }
}
