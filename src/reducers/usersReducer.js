import {
  GET_USERS,
  REGISTER_USER
} from '../actions/types'

const usersReducer = (state = [], action) => {
  switch(action.type) {
    case GET_USERS:
      return action.data
    case REGISTER_USER:
      return [
        ...state,
        action.data
      ]
    default:
      return state
  }
}

export default usersReducer